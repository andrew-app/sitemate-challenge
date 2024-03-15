package com.demo.issueservice

import com.demo.issueservice.domain.issues.Issue
import com.demo.issueservice.domain.issues.IssueRepository
import org.slf4j.LoggerFactory
import org.springframework.scheduling.annotation.Scheduled
import java.util.*


class IssueGenerator(
    private val issuesRepository: IssueRepository
) {
    @Scheduled(fixedRate = 10000)
    fun addIssue() {
        val count = issuesRepository.issuesAmount() + 1
        if (issuesRepository.issuesAmount() >= 1000 ) {
            issuesRepository.deleteAllIssues()
        }
        issuesRepository.saveIssue(
            Issue(
                UUID.randomUUID(),
                "Issue $count",
                "This is the issue description",
            )
        )
        logger.info("New Issue created, count: $count")
    }

    companion object {
        private val logger = LoggerFactory.getLogger(IssueGenerator::class.java)
    }
}
