package com.tine.learnTineLearn.service;

import com.tine.learnTineLearn.model.Course;
import com.tine.learnTineLearn.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public ArrayList getCourses(){
        ArrayList<Course> courses = new ArrayList<>();
        //Get courses from db
        courseRepository.findAll().forEach(courses::add);
        return courses;
    }

    public Course addNewCourse(Course course){
        return courseRepository.save(course);
    }

}
