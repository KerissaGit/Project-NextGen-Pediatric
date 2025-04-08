from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db


class Doctor(db.Model, SerializerMixin):
    __tablename__ = 'doctors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    specialty = db.Column(db.String)
    age_of_care = db.Column(db.Integer)

    # Add relationship
    appointments = db.relationship('Appointment', back_populates='doctors')
    children = association_proxy('appointments', 'child')


    # serialize_rules = (,)



class Child(db.Model, SerializerMixin):
    __tablename__ = 'children'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    age = db.Column(db.Integer)
    appointment = db.Column(db.DateTime)
    parent_id = db.Column(db.Integer, db.ForeignKey('parents.id'), nullable = False)

    # Add relationship
    parents = db.relationship('Parent', back_populates='children')
    appointments = db.relationship('Appointment', back_populates='children')
    doctors = association_proxy('children', 'doctor')


    # serialize_rules = (,)



class Parent(db.Model, SerializerMixin):
    __tablename__ = 'parents'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    child_id = db.Column(db.Integer, db.ForeignKey('children.id'), nullable = False)

    # Add relationship
    child = db.relationship('Child', back_populates='parents')
    appointments = association_proxy('children', 'appointment')


    # serialize_rules = (,)


class Appointment(db.Model, SerializerMixin):
    __tablename__ = 'appointment'

    id = db.Column(db.Integer, primary_key=True)
    child_id = db.Column(db.Integer, db.ForeignKey('children.id'), nullable = False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.id'), nullable = False)


    # Add relationship
    child = db.relationship('Child', back_populates='appointments')
    doctor = db.relationship('Doctor', back_populates='appointments')
    parents = association_proxy('children', 'parent')


    # serialize_rules = (,)





