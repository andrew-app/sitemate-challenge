package com.demo.issueservice.domain.issues

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.util.UUID


@Entity
@Table(name = "issues")
class Issue (
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue
    val id: UUID = UUID.randomUUID(),
    @Column(name = "email", nullable = true)
    val title: String,
    @Column(name = "status", nullable = true)
    val description: String = "Pending",
)