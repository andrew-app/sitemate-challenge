package com.demo.issueservice

import com.demo.issueservice.domain.issues.IssueRepository
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.scheduling.annotation.EnableScheduling

@Configuration
@EnableScheduling
class IssueGeneratorConfig(
    private val issueRepo: IssueRepository,
) {
    @Bean
    fun scheduledTasks(): IssueGenerator {
        return IssueGenerator(issueRepo)
    }
}