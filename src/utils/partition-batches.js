
export default function partitionBatches(courses) {
    const partitionedCourses = [];
    const batchTags = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    courses.forEach(course => {
        if (course.batches > 1) {
            for (let i = 0; i < course.batches; i++) {
                const { batches, ...rest } = course; 
                partitionedCourses.push({
                    ...rest,
                    code: `${course.code}-${batchTags[i]}`,
                    courseName: `${course.courseName} - ${batchTags[i]}`,
                });
            }
        } else {
            const { batches, ...rest } = course;
            partitionedCourses.push(rest);
        }
    });

    return partitionedCourses;
}