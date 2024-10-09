package com.tine.learnTineLearn;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Home {

    @GetMapping("/")
    public String hello(@RequestParam(value = "name", defaultValue = "new learner") String name) {
        System.out.println("Here");
        return String.format("Hello %s!", name);
    }

}
