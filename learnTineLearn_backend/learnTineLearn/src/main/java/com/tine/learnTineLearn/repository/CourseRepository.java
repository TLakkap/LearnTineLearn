package com.tine.learnTineLearn.repository;

import com.tine.learnTineLearn.model.Course;
import org.springframework.data.repository.CrudRepository;

public interface CourseRepository extends CrudRepository<Course, Long> {
}
