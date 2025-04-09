#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Doctor, Child, Parent, Appointment  

def create_doctors():
    doctors = []
    names = []
    for _ in range(8):
        name = fake.name()
        while name in names:
            name = fake.name()
        names.append(name)

        doctor = Doctor(
            name=name,
            specialty=fake.word(),
            age_of_care=randint(25, 50)
        )
        doctors.append(doctor)

    return doctors

def create_children():
    children = []
    for _ in range(10):
        child = Child(
            name=fake.first_name(),
            age=randint(1, 18),
            appointment=fake.date_this_year(),
            parent_id=randint(1, 5)
        )
        children.append(child)

    return children

def create_parents():
    parents = []
    for _ in range(5):
        parent = Parent(
            name=fake.name(),
            email=fake.email()
        )
        parents.append(parent)

    return parents

def create_appointments(doctors, children):
    appointments = []
    for _ in range(15):
        appointment = Appointment(
            child_id=randint(1, len(children)),
            doctor_id=randint(1, len(doctors)),
            start_time=fake.date_this_year(),
            end_time=fake.date_this_year()
        )
        appointments.append(appointment)

    return appointments

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        # Create doctors, children, and parents
        doctors = create_doctors()
        children = create_children()
        parents = create_parents()

        # Add them to the session and commit
        db.session.add_all(doctors)
        db.session.add_all(children)
        db.session.add_all(parents)
        db.session.commit()

        # Create appointments
        appointments = create_appointments(doctors, children)
        db.session.add_all(appointments)
        db.session.commit()

        print("Seeding complete!")
