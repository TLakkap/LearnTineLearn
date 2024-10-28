package com.tine.learnTineLearn.coursetests;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tine.learnTineLearn.controller.CourseController;
import com.tine.learnTineLearn.model.Course;
import com.tine.learnTineLearn.service.CourseService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.Arrays;

import static org.mockito.Mockito.when;

@WebMvcTest(CourseController.class)
public class CourseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CourseService courseService;

    @Test
    public void whenGetAllCourses_thenAllCoursesAreReturned() throws Exception {
        Course course1 = new Course("Spring Framework");
        Course course2 = new Course("SQL");
        ArrayList<Course> mockCourses = new ArrayList<>(Arrays.asList(course1, course2));
        when(courseService.getCourses()).thenReturn(mockCourses);

        mockMvc.perform(get("/api/"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].courseName").value("Spring Framework"))
                .andExpect(jsonPath("$[1].courseName").value("SQL"));

        verify(courseService, times(1)).getCourses();
    }

    @Test
    public void whenHandleDataIsRequested_thenNewCourseIsAddedToDatabase() throws Exception {
        Course course = new Course("SQL");
        when(courseService.addNewCourse(any(Course.class))).thenReturn(course);

        // convert course object to json-string
        ObjectMapper objectMapper = new ObjectMapper();
        String courseJson = objectMapper.writeValueAsString(course);

        mockMvc.perform(post("/api/addNew")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(courseJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.courseName").value("SQL"));

        verify(courseService, times(1)).addNewCourse(any(Course.class));
    }
}
