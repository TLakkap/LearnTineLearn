package com.tine.learnTineLearn.controller;

import com.tine.learnTineLearn.CustomLogger;
import com.tine.learnTineLearn.model.Course;
import com.tine.learnTineLearn.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CustomLogger customLogger;
    private final CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService){
        this.customLogger = new CustomLogger();
        this.courseService = courseService;
    }

    @GetMapping
    public ArrayList<Course> getAllCourses() {
        customLogger.debug("Get all courses");

        return courseService.getCourses();
    }

    @PostMapping("/new")
    public ResponseEntity<Course> handleData(@RequestBody Course course) {
        customLogger.debug("Saving new course: " + course.getCourseName());

        Course savedCourse = courseService.addNewCourse(course);

        return new ResponseEntity<>(savedCourse, HttpStatus.CREATED);
    }

}
