from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from datetime import datetime
from sqlalchemy import event
from sqlalchemy import DateTime

from config import db


class Doctor(db.Model, SerializerMixin):
    __tablename__ = 'doctors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    specialty = db.Column(db.String)
    age_of_care = db.Column(db.Integer)

    # Add relationship
    appointments = db.relationship('Appointment', back_populates='doctor')
    children = association_proxy('appointments', 'child')


    # serialize_rules = (,)
    serialize_rules = ('-appointments', '-children')


class Child(db.Model, SerializerMixin):
    __tablename__ = 'children'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    age = db.Column(db.Integer)
    appointment = db.Column(db.DateTime)
    parent_id = db.Column(db.Integer, db.ForeignKey('parents.id'), nullable = False)

    # Add relationship
    parent = db.relationship('Parent', back_populates='children')
    appointments = db.relationship('Appointment', back_populates='children')
    doctors = association_proxy('children', 'doctor')

    @validates('name')
    def validates_name(self, key, value):
        if not value or len(value) < 1:
            raise ValueError('Child must have a name.')
        return value

    @validates('age')
    def validates_age(self, key, value):
        if not value or len(value) < 1 or value > 18:
            raise ValueError('Child must have an age.')
        return value

    # serialize_rules = (,)
    serialize_rules = ('-appointments', '-doctors')


class Parent(db.Model, SerializerMixin):
    __tablename__ = 'parents'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    child_id = db.Column(db.Integer, db.ForeignKey('children.id'), nullable = False)

    # Add relationship
    child = db.relationship('Child', back_populates='parent')
    appointments = association_proxy('children', 'appointment')


    # serialize_rules = (,)
    serialize_rules = ('-appointments',)


class Appointment(db.Model, SerializerMixin):
    __tablename__ = 'appointment'

    id = db.Column(db.Integer, primary_key=True)
    child_id = db.Column(db.Integer, db.ForeignKey('children.id'), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.id'), nullable=False)
    date= db.Column(db.DateTime, nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)

    

    # Add relationships
    child = db.relationship('Child', back_populates='appointments')
    doctor = db.relationship('Doctor', back_populates='appointments')

    @validates
    def validate_datetime(self, time_str, field_name):
        try:
            return datetime.strptime(time_str, "%Y-%m-%d %H:%M")
        except ValueError:
             raise ValueError(f"Invalid date or time format for {field_name}. Use YYYY-MM-DD HH:MM.")

    @validates
    def validate_time_order(self):
        if self.start_time >= self.end_time:
            raise ValueError("Start time must be before end time.")
        
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
        """Ensure that start time is before end time."""
        if self.start_time >= self.end_time:
            raise ValueError("Start time must be before end time.")

    # Method to validate before insert/update
    def before_insert(self):
        self.validate_time_order()


# Event listener outside of the class definition
@event.listens_for(Appointment, 'before_insert')
def validate_before_insert(mapper, connection, target):
    target.before_insert()

# serialize_rules = (,)
serialize_rules = ('-child', '-doctor')




