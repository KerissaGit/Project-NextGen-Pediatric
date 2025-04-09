#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, make_response, jsonify, request
from flask_restful import Resource
from sqlalchemy.exc import NoResultFound

# Local imports
from config import app, db, api
# Add your model imports
from models import Parent, Child, Doctor, Appointment
from datetime import datetime


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Parents(Resource):
    def get(self):
        parents = db.session.execute(db.select(Parent)).scalars().all()
        parents_list = [parent.to_dict() for parent in parents]
        return make_response({"parents": parents_list}, 200)

    
class Children(Resource):
    def get(self):
        children = db.session.execute(db.select(Child)).scalars().all()
        children_list = [child.to_dict() for child in children]
        return make_response(children_list)

    def post(self):
        params = request.json
        try:
            if not params.get('name'):
                return make_response({"errors": ["Missing required field: name"]}, 400)

            child = Child(name=params['name'])
            db.session.add(child)
            db.session.commit()
            return make_response(child.to_dict(), 201)
        except Exception as e:
            return make_response({"errors": [str(e)]}, 400)
        
class ChildById(Resource):
    def get(self, id):
        try:
            child = db.session.execute(db.select(Child).filter_by(id=id)).scalar_one()
            return make_response(child.to_dict())
        except NoResultFound:
            return make_response({"error": "Child not found"}, 404)

    def patch(self, id):
        try:
            child = db.session.execute(db.select(Child).filter_by(id=id)).scalar_one()
            params = request.json
            for key in params:
                setattr(child, key, params[key])
            db.session.commit()
            return make_response(child.to_dict(), 202)
        except NoResultFound:
            return make_response({"error": "Child not found"}, 404)
        except Exception as e:
            return make_response({"errors": [str(e)]}, 400)


class Doctors(Resource):
    def get(self):
        doctors = db.session.execute(db.select(Doctor)).scalars().all()
        doctors_list = [doctor.to_dict() for doctor in doctors]
        return make_response(doctors_list)


class Appointments(Resource):
    def post(self):
        try:
            params = request.json
            start_time = datetime.strptime(params['start_time'], "%Y-%m-%d %H:%M")
            end_time = datetime.strptime(params['end_time'], "%Y-%m-%d %H:%M")

            # Create a new Appointment
            appointment = Appointment(
                child_id=params['child_id'],
                doctor_id=params['doctor_id'],
                start_time=start_time,
                end_time=end_time
            )

            # Validate that the start time is before the end time
            appointment.validate_time_order()
            db.session.add(appointment)
            db.session.commit()

            return make_response(appointment.to_dict(), 201)
        except ValueError as e:
            return make_response({"errors": [str(e)]}, 400)
        except Exception as e:
            return make_response({"errors": [f"Unexpected error: {str(e)}"]}, 400)


api.add_resource(Parents, '/parents')
api.add_resource(Children, '/children')
api.add_resource(ChildById, '/children/<int:id>')
api.add_resource(Doctors, '/doctors')
api.add_resource(Appointments, '/appointments')



if __name__ == '__main__':
    app.run(port=5555, debug=True)

