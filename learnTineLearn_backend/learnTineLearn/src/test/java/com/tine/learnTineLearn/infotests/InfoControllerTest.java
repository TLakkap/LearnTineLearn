package com.tine.learnTineLearn.infotests;

import com.tine.learnTineLearn.controller.InfoController;
import com.tine.learnTineLearn.model.Info;
import com.tine.learnTineLearn.service.InfoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(InfoController.class)
public class InfoControllerTest {

        @Autowired
        private MockMvc mockMvc;

        @MockBean
        private InfoService infoService;

        @Test
        void whenSendInfoIsRequestedAndNoInfosInDb_thenCorrectStatusIsReturned() throws Exception {
            Long courseId = 0L;
            when(infoService.getInfosByCourseId(courseId)).thenReturn(new ArrayList<>());

            mockMvc.perform(get("/api/{courseId}/", courseId))
                    .andExpect(status().isNotFound());

            verify(infoService, times(1)).getInfosByCourseId(courseId);
            verify(infoService, times(0)).getRandomInfoFromList(new ArrayList<>());
        }

        @Test
        void whenSendInfoIsRequestedAndInfoInDb_thenCorrectStatusAndInfoIsReturned() throws Exception {
            // Create test info
            Long courseId = 0L;
            Info info1 = new Info(courseId, "Info 1");
            Info info2 = new Info(courseId, "Info 2");
            ArrayList<Info> infos = new ArrayList<>(List.of(info1, info2));

            when(infoService.getInfosByCourseId(courseId)).thenReturn(infos);
            when(infoService.getRandomInfoFromList(infos)).thenReturn(info1);

            mockMvc.perform(get("/api/{courseId}/", courseId))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.info").value(info1.getInfo()));

            verify(infoService, times(1)).getInfosByCourseId(courseId);
            verify(infoService, times(1)).getRandomInfoFromList(infos);
        }
}
