package com.tine.learnTineLearn.controller;

import com.tine.learnTineLearn.CustomLogger;
import com.tine.learnTineLearn.model.Course;
import com.tine.learnTineLearn.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public List<Course> getAllCourses() {
        customLogger.debug("Get all courses");

        return courseService.getCourses();
    }

    @PostMapping
    public ResponseEntity<Course> saveNewCourse(@RequestBody Course course) {
        customLogger.debug("Saving new course: " + course.getName());

        Course savedCourse = courseService.addNewCourse(course);

        return new ResponseEntity<>(savedCourse, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        boolean isDeleted = courseService.deleteCourseById(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();  //return 204
        } else {
            return ResponseEntity.notFound().build();   //return 404
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody Course course) {
        if (!id.equals(course.getId())) {
            return ResponseEntity.badRequest().build();
        }

        Course updatedCourse = courseService.updateCourse(course);
        return new ResponseEntity<>(updatedCourse, HttpStatus.OK);
    }

}
