package com.demo.issueservice.api.issues


import com.demo.issueservice.common.controller.DefaultDelegate
import com.demo.issueservice.common.model.IssuesGet200Response
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Component

@Component
class IssuesDelegateImpl(
    val issuesService: IssuesService
): DefaultDelegate {
    override fun issuesGet(): ResponseEntity<IssuesGet200Response> {
        return ResponseEntity(IssuesGet200Response(issuesService.findUsers()), HttpStatus.OK)
    }
}