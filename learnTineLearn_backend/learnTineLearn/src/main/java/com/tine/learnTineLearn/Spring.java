package com.tine.learnTineLearn;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/spring")
public class Spring{

    /*@GetMapping("/spring")
    public String hello() {
        System.out.println("Here");
        return "Welcome to test your knowledge on Spring Framework!";
    }*/

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
