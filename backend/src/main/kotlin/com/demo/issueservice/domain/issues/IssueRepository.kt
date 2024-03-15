package com.demo.issueservice.domain.issues

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Component
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface IIssueRepository : JpaRepository<Issue, UUID> {
    override fun findAll(): List<Issue>
}

@Component
class IssueRepository(
    private val issueRepository: IIssueRepository
) {
    fun findAllIssues():List<Issue> {
        return issueRepository.findAll()
    }

    fun saveIssue(issue: Issue) {
        issueRepository.save(Issue(issue.id, issue.title, issue.description))
    }

    fun issuesAmount(): Int {
        return issueRepository.findAll().size
    }

    fun deleteAllIssues() {
        issueRepository.deleteAll()
    }

    fun findIssueById(id: UUID): Issue {
        return issueRepository.findById(id).get()
    }
}