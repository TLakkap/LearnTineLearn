package com.tine.learnTineLearn;

import jakarta.persistence.*;


@Entity
@Table(name = "infos")
public class Info {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String info;

    private Info() {}

    public Info(String info) {
        this.info = info;
    }

    public Long getId() {
        return id;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

}
