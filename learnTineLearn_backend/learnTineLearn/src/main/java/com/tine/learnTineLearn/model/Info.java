package com.tine.learnTineLearn.model;

import jakarta.persistence.*;

@Entity
@Table(name = "infos")
public class Info {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long topicId;

    private String info;

    private Info() {}

    public Info(Long topicId, String info) {
        this.topicId = topicId;
        this.info = info;
    }

    public Long getId() {
        return id;
    }

    public Long getTopicId() {
        return topicId;
    }

    public void setTopicId(Long topicId) {
        this.topicId = topicId;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

}
