package com.tine.learnTineLearn.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Topic {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long courseId;

    private String name;

    private Topic() {}

    public Topic(Long courseId, String name) {
        this.courseId = courseId;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
