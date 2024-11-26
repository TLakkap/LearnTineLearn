package com.tine.learnTineLearn.service;

import com.tine.learnTineLearn.CustomLogger;
import com.tine.learnTineLearn.model.Course;
import com.tine.learnTineLearn.repository.CourseRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository) {
        CustomLogger customLogger = new CustomLogger();
        this.courseRepository = courseRepository;
    }

    public ArrayList<Course> getCourses(){
        ArrayList<Course> courses = new ArrayList<>();
        //Get courses from db
        courseRepository.findAll().forEach(courses::add);
        return courses;
    }

    public Course addNewCourse(Course course){
        return courseRepository.save(course);
    }

    public boolean deleteCourseById(Long id) {
        if (courseRepository.existsById(id)) {  // Check if course exists in db
            courseRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Course updateCourse(Course course) {
        Optional<Course> existingCourse = courseRepository.findById(course.getId());

        if (existingCourse.isPresent()) {
            Course updatedCourse = existingCourse.get();

            // Update only if changed
            if (!updatedCourse.getName().equals(course.getName())) {
                updatedCourse.setName(course.getName());
                return courseRepository.save(updatedCourse);
            }

            return updatedCourse;
        }

        throw new EntityNotFoundException("Course with id " + course.getId() + " not found from database.");
    }
}
