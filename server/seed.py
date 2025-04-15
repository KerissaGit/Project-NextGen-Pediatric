#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
from datetime import timedelta

# Local imports
from app import app
from models import db, Doctor, Child, Parent, Appointment, Review

# def create_doctors():
#     doctors = []
#     names = []
#     for _ in range(10):
#         name = fake.name()
#         while name in names:
#             name = fake.name()
#         names.append(name)

#         doctor = Doctor(
#             name=name
#         )
#         doctors.append(doctor)

#     return doctors


# Create Hard coded doctors and comment out code about
def create_doctors():
    doctors = [
        Doctor(
            name="Dr. Needle",
            specialty="Illness",
            education="Harvard Medical School",
            years_experience=12
        ),
        Doctor(
            name="Dr. Bones",
            specialty="Broken Bones",
            education="Johns Hopkins University",
            years_experience=15
        ),
        Doctor(
            name="Dr. White",
            specialty="Yearly Check-up",
            education="Stanford University",
            years_experience=10
        ),
        Doctor(
            name="Dr. Payne",
            specialty="Physical",
            education="University of California, San Francisco",
            years_experience=8
        )
    ]
    return doctors


def create_parents():
    parents = []
    for _ in range(5):
        parent = Parent(
            username=fake.user_name(),
            email=fake.email()
        )
        parent.password_hash = "password123"
        parents.append(parent)

    return parents

def create_children():
    children = []
    for _ in range(10):
        parent = rc(parents) #Testing start here till...
        child = Child(
            name=fake.first_name(),
            age=randint(1, 18),
            # appointments=fake.date_this_year(),
            # parent_id=randint(1, 5)
            parent_id=parent.id #Testing this to fix errors i've encountered
        )
        children.append(child)

    return children


def create_appointments(doctors, children):
    appointments = []
    for _ in range(15):
        date = fake.date_time_this_year()
        start_time = date
        end_time = start_time + timedelta(hours=1)

        appointment = Appointment(
            child_id=randint(1, len(children)),
            doctor_id=randint(1, len(doctors)),
            date=start_time.date(),
            start_time=start_time,
            end_time=end_time
        )
        appointments.append(appointment)

    return appointments

def create_reviews(doctors):
    reviews = []
    for doctor in doctors:
        for _ in range(randint(1,3)):
            review = Review(
                doctor_id = doctor.id,
                rating = randint(1,5),
                comment = fake.sentence()
            )
            reviews.append(review)
    return reviews

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        # Create doctors, children, and parents
        doctors = create_doctors()
        db.session.add_all(doctors)
        db.session.commit() 

        parents = create_parents()
        db.session.add_all(parents)
        db.session.commit()

        children = create_children()
        db.session.add_all(children)
        db.session.commit()

        reviews = create_reviews(doctors)
        db.session.add_all(reviews)
        db.session.commit()

        # Add them to the session and commit

        # Create appointments
        appointments = create_appointments(doctors, children)
        db.session.add_all(appointments)
        db.session.commit()

        print("Seeding complete!")
    

# reason_visit= ("Sick", "Broken Bone", "Yearly Check-up", "Physical")


