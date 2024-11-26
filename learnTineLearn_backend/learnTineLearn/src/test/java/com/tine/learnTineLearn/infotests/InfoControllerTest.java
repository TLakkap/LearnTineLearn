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
            Long topicId = 0L;
            when(infoService.getInfosByTopicId(topicId)).thenReturn(new ArrayList<>());

            mockMvc.perform(get("/api/1/topics/{topicId}", topicId))
                    .andExpect(status().isNotFound());

            verify(infoService, times(1)).getInfosByTopicId(topicId);
            verify(infoService, times(0)).getRandomInfoFromList(new ArrayList<>());
        }

        @Test
        void whenSendInfoIsRequestedAndInfoInDb_thenCorrectStatusAndInfoIsReturned() throws Exception {
            // Create test info
            Long topicId = 0L;
            Info info1 = new Info(topicId, "Info 1");
            Info info2 = new Info(topicId, "Info 2");
            ArrayList<Info> infos = new ArrayList<>(List.of(info1, info2));

            when(infoService.getInfosByTopicId(topicId)).thenReturn(infos);
            when(infoService.getRandomInfoFromList(infos)).thenReturn(info1);

            mockMvc.perform(get("/api/1/topics/{topicId}", topicId))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.info").value(info1.getInfo()));

            verify(infoService, times(1)).getInfosByTopicId(topicId);
            verify(infoService, times(1)).getRandomInfoFromList(infos);
        }
}
