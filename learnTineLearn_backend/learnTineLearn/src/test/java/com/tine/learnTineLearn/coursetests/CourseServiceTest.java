package com.tine.learnTineLearn.coursetests;

import com.tine.learnTineLearn.model.Course;
import com.tine.learnTineLearn.repository.CourseRepository;
import com.tine.learnTineLearn.service.CourseService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class CourseServiceTest {

    @Mock
    private CourseRepository courseRepository;

    @InjectMocks
    private CourseService courseService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void whenGetCoursesIsRequested_thenAllCoursesAreReturned() {
        Course course1 = new Course("Math 101");
        Course course2 = new Course("Science 101");
        List<Course> mockCourses = Arrays.asList(course1, course2);

        when(courseRepository.findAll()).thenReturn(mockCourses);

        ArrayList<Course> courses = courseService.getCourses();

        assertEquals(2, courses.size());
        assertEquals("Math 101", courses.get(0).getCourseName());
        assertEquals("Science 101", courses.get(1).getCourseName());

        verify(courseRepository, times(1)).findAll();
    }

    @Test
    public void whenAddNewCourseIsRequested_thenCourseIsSavedToDb() {
        Course course = new Course("History 101");
        when(courseRepository.save(course)).thenReturn(course);

        Course savedCourse = courseService.addNewCourse(course);

        assertEquals("History 101", savedCourse.getCourseName());

        verify(courseRepository, times(1)).save(course);
    }
}
