package com.tine.learnTineLearn.controller;

import com.tine.learnTineLearn.model.Course;
import com.tine.learnTineLearn.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api")
public class CourseController {

    private final CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService){
        this.courseService = courseService;
    }

    @GetMapping("/")
    public ArrayList getAllCourses() {
        System.out.println("Get all courses");

        ArrayList<Course> courses = courseService.getCourses();

        return courses;
    }

    @PostMapping("/addNew")
    public ResponseEntity<Course> handleData(@RequestBody Course course) {
        System.out.println("Saving new course: " + course.getCourseName());

        Course savedCourse = courseService.addNewCourse(course);

        return new ResponseEntity<>(savedCourse, HttpStatus.CREATED);
    }

}
