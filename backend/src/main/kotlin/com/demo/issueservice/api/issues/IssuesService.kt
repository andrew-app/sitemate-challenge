package com.demo.issueservice.api.issues


import com.demo.issueservice.common.model.IssueDto
import com.demo.issueservice.domain.issues.IssueRepository

import org.springframework.stereotype.Service

@Service
class IssuesService(
    private val issueRepository: IssueRepository,
) {
    fun findUsers(): List<IssueDto> {
        return issueRepository.findAllIssues().map {
            issue ->
            IssueDto(
                issue.id,
                issue.title,
                issue.description
            )
        }
    }
}