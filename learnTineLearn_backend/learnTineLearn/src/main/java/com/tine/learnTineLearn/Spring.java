package com.tine.learnTineLearn;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/spring")
public class Spring{

    @Autowired
    InfoRepository infoRepository;

    /*List<String> infos = List.of(
            "Benefits of using Spring: Lightweight, IoC, AOP, IoC container, MVC framework, transaction management, exception handling.",
            "IoC = Inversion of Control. Spring container takes care of wiring dependencies of various objects.",
            "AOP = Aspect-Oriented Programming. Spring supports AOP to separate business logic from system services.",
            "IoC container manages Spring Bean life cycle and project-specific configurations."
    );*/

    @GetMapping("/")
    public Response sendInfo() {
        List<Info> infos = new ArrayList<>();
        infoRepository.findAll().forEach(infos::add);

        if (infos.isEmpty()) {
            return new Response("No saved infos");
        }

        for (Info info : infos) {
            System.out.println(info.getInfo());
        }

        Random random = new Random();
        Info info = infos.get(random.nextInt(infos.size()));
        System.out.println(info.getInfo());

        return new Response(info.getInfo());
    }

    @PostMapping("/new")
    public Response handleData(@RequestBody Info info) {
        System.out.println("Received new info: " + info.getInfo());

        infoRepository.save(info);

        return new Response("New info saved!");
    }

    public static class DataPayload {
        private String info;

        public String getInfo() {
            return info;
        }

        public void setInfo(String info) {
            this.info = info;
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
