package com.tine.learnTineLearn.repository;

import com.tine.learnTineLearn.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findAllByOrderByNameAsc();
}
