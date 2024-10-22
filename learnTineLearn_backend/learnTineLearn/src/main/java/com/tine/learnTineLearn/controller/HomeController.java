package com.tine.learnTineLearn.controller;

import com.tine.learnTineLearn.model.Course;
import com.tine.learnTineLearn.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class HomeController {

    @Autowired
    private CourseService courseService;

    @GetMapping("/")
    public ArrayList hello() {
        System.out.println("Hello");

        ArrayList<Course> courses = courseService.getCourses();

        return courses;
    }

    @PostMapping("/new")
    public ResponseEntity<Course> handleData(@RequestBody Course course) {
        System.out.println("Saving new course: " + course.getCourseName());

        Course savedCourse = courseService.addNewCourse(course);

        return new ResponseEntity<>(savedCourse, HttpStatus.CREATED);
    }

}
