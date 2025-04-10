from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from datetime import datetime
from sqlalchemy import event
from sqlalchemy import DateTime

from config import db, bcrypt


class Doctor(db.Model, SerializerMixin):
    __tablename__ = 'doctors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    # reason_visit = db.Column(db.String)
    # specialty = db.Column(db.String)
    # age_of_care = db.Column(db.Integer)

    appointments = db.relationship('Appointment', back_populates='doctor')
    children = association_proxy('appointments', 'child')

    # @validates('age_of_care')
    # def validate_age__of_care(age, min_age, max_age):
    #     if not isinstance(age, int):
    #         raise TypeError("Age must be an integer.")
    #     if min_age <= age <= max_age:
    #         return True
    #     else:
    #         raise ValueError(f"Age must be between {min_age} and {max_age}.")
        



class Child(db.Model, SerializerMixin):
    __tablename__ = 'children'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    age = db.Column(db.Integer)
    parent_id = db.Column(db.Integer, db.ForeignKey('parents.id'), nullable=False)

    parent = db.relationship('Parent', back_populates='children')
    appointments = db.relationship('Appointment', back_populates='child')
    doctors = association_proxy('appointments', 'doctor')

    @validates('name')
    def validates_name(self, key, value):
        if not value or len(value) < 1:
            raise ValueError('Child must have a name.')
        return value

    @validates('age')
    def validates_age(self, key, value):
        if not value or value < 0 or value > 18:
            raise ValueError('Child must have a valid age (0-18).')
        return value

    serialize_rules = ('-appointments', '-doctors')


class Parent(db.Model, SerializerMixin):
    __tablename__ = 'parents'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    email = db.Column(db.String)

    children = db.relationship('Child', back_populates='parent')

    # appointments through children
    appointments = association_proxy('children', 'appointments')

    @property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    serialize_rules = ('-appointments',)


class Appointment(db.Model, SerializerMixin):
    __tablename__ = 'appointments'

    id = db.Column(db.Integer, primary_key=True)
    child_id = db.Column(db.Integer, db.ForeignKey('children.id'), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.id'), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)

    child = db.relationship('Child', back_populates='appointments')
    doctor = db.relationship('Doctor', back_populates='appointments')
    parent = association_proxy('child', 'parent')

    @validates('start_time')
    def validate_start_time(self, key, value):
        if value is None:
            raise ValueError('Start time must be provided.')
        return value

    @validates('end_time')
    def validate_end_time(self, key, value):
        if value is None:
            raise ValueError('End time must be provided.')
        return value

    def validate_time_order(self):
        if self.start_time >= self.end_time:
            raise ValueError("Start time must be before end time.")

    serialize_rules = ('-child', '-doctor')


@event.listens_for(Appointment, 'before_insert')
def validate_before_insert(mapper, connection, target):
    target.validate_time_order()

