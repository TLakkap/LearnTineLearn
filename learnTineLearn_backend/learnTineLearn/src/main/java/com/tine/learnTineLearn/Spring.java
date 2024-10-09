package com.tine.learnTineLearn;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Dictionary;
import java.util.Hashtable;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/spring")
public class Spring{

    ArrayList<String> infos = new ArrayList<>();

    public void setInfos() {
        infos.add("Important information 1");
    }

    @GetMapping("/")
    public Response hello() {
        setInfos();
        String info = infos.get(0);
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
