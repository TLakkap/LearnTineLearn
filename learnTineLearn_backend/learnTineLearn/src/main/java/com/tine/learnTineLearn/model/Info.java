package com.tine.learnTineLearn.model;

import jakarta.persistence.*;

@Entity
@Table(name = "infos")
public class Info {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long courseId;

    private String info;

    private Info() {}

    public Info(Long courseId, String info) {
        this.courseId = courseId;
        this.info = info;
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

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

}
