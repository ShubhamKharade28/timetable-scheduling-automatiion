// models/Course.js
export class Course {
  constructor({ id, name, semester, type, sessions, batches = 1, elective = null }) {
    this.id = id;
    this.name = name;
    this.semester = semester;
    this.type = type;
    this.sessions = sessions;
    this.batches = batches;
    this.elective = elective;
  }

  validate() {
    if (!this.id) throw new Error("Course ID is required");
    if (!['lecture', 'LAB', 'Tutorial', 'Others'].includes(this.type)) {
      throw new Error(`Invalid course type: ${this.type}`);
    }
    if (![3, 5, 7].includes(this.semester)) {
      throw new Error(`Invalid semester: ${this.semester}`);
    }
    return true;
  }
}