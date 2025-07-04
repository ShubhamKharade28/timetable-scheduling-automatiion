// models/Faculty.js
export class Faculty {
  constructor({ id, name, workload_factor, preferred_courses = [], preferred_timeslot = 'none' }) {
    this.id = id;
    this.name = name;
    this.workload_factor = workload_factor;
    this.preferred_courses = preferred_courses;
    this.preferred_timeslot = preferred_timeslot;
  }

  validate() {
    if (!this.id) throw new Error("Faculty ID is required");
    if (this.workload_factor < 1 || this.workload_factor > 4) {
      throw new Error(`Invalid workload factor: ${this.workload_factor}`);
    }
    if (!['morning', 'afternoon', 'none'].includes(this.preferred_timeslot)) {
      throw new Error(`Invalid preferred timeslot: ${this.preferred_timeslot}`);
    }
    return true;
  }
}