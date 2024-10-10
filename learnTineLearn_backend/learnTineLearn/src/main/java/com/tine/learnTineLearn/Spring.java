package com.tine.learnTineLearn;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/spring")
public class Spring{

    List<String> infos = List.of(
            "Benefits of using Spring: Lightweight, IoC, AOP, IoC container, MVC framework, transaction management, exception handling.",
            "IoC = Inversion of Control. Spring container takes care of wiring dependencies of various objects.",
            "AOP = Aspect-Oriened Programming. Spring supports AOP to separate business logic from system services.",
            "IoC container manages Spring Bean life cycle and project-spesific configurations."
    );

    @GetMapping("/")
    public Response hello() {
        String info = infos.get((int) (Math.random() * infos.size()));
        System.out.println(info);
        return new Response(info);
    }

    @PostMapping("/answer")
    public Response handleData(@RequestBody DataPayload data) {
        System.out.println("Received answer: " + data.getAnswer());

        return new Response("Thank you for answering!");
    }

    public static class DataPayload {
        private String answer;

        public String getAnswer() {
            return answer;
        }

        public void setAnswer(String answer) {
            this.answer = answer;
        }
    }

    public static class Response {
        private String message;

        public Response(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

}
