# Julian Perge

\vspace{-1.5em}

\noindent\rule{\linewidth}{0.4pt}

Columbus, OH<!--phone--> | <julianperge@gmail.com> | [github.com/julian-perge](https://github.com/julian-perge) | [linkedin.com/in/julian-perge](https://linkedin.com/in/julian-perge)

## Summary

Platform and DevOps engineer with 7+ years of full-stack and cloud-platform experience. At Armaments Research Company I built and operated the AWS platform that powered a multi-product engineering org across commercial and GovCloud environments. Focus areas: GitOps-driven Kubernetes (ArgoCD / Helm), OpenTelemetry-based observability, shared CI/CD components and base images, and shared SBT/Scala build tooling for 15+ Java/Scala services. Drove the EKS-to-ECS migration to meet IL6 compliance requirements. Prior experience at **JPMorgan Chase** modernizing a COBOL/mainframe application into a Java 11 + Spring Boot microservice suite, and at **Huntington National Bank** on production support for ACH/wire-transfer systems.

## Experience

### Senior DevSecOps/Software Engineer | Armaments Research Company | May 2022 - October 2026

- Drove every Kubernetes minor-version upgrade on four EKS clusters spanning commercial and govcloud - 12 hops from 1.23 to 1.35 over 2+ years.
- Drove the EKS-to-ECS Fargate migration for IL6 compliance: deployed TAK Server on ECS Fargate with Aurora Serverless v2, NLB, EFS and Keycloak SSO, and built shared ECS and Lambda deploy CI templates.
- Consolidated observability for four EKS environments onto a single hub cluster: replaced Prometheus metrics stack with Grafana Mimir + Tempo + Loki fed by OpenTelemetry Collectors, standardizing services on JSON structured logging for queryable, audit-ready logs and cutting per-cluster pod count from ~32 to ~14 and node groups from 4 to 1. Later cut cross-AZ data transfer spend by ~$2.5k/month by compressing Mimir and Loki ingester traffic.
- Moved all Kubernetes resource provisioning out of OpenTofu and into ArgoCD GitOps across four clusters, cutting the OpenTofu CI pipeline runtime from 120-150s to 60-75s (~50% reduction).
- Replaced internet-exposed SSH bastions in 4 AWS environments, including GovCloud, with Cloudflare Tunnel connectors on ECS Fargate, after triaging 237 Security Hub findings and tracing a live GuardDuty SSH brute-force alert.
- Hardened the platform security posture: deployed DefectDojo for centralized CVE and vulnerability management, cutting one service's open CVEs from ~90 to ~15 alongside Renovate dependency automation, and stood up Keycloak as a GitLab-backed SSO / OIDC identity provider.
- Designed and rolled out autoscaling GitLab CI runners across the organization, cutting runner EC2 spend by over 50% and guaranteeing job start under ~90 seconds.
- Built and maintained a shared multi-arch CI base-image library with the common toolbelt baked in and ECR Credential Helper preinstalled; eliminated per-job package manager install steps across every service CI pipeline, and removed Docker Hub pull-rate-limit failures by hosting in GitLab Container Registry.
- Built a custom sbt AutoPlugin and a single inherited GitLab CI template adopted by 15+ Java/Scala services, then leveraged both to drive the org-wide Java 11 to Java 21 + Play 2 to Play 3 + Akka to Apache Pekko migration in ~3 weeks. Later moved those services to committed Dockerfiles and a GitLab Maven virtual registry, ending build failures from Maven Central rate limits.
- Built a shared release-promotion CI component for 6 deployment repos, replacing ~1,000 lines of copy-pasted Python, with an enforced changelog convention and a Trivy vulnerability gate on every prod promotion.
- Built an AI merge-request review CI component on AWS Bedrock (gpt-oss-120b by default) at ~$0.008 per review, with a fixed evaluation set for comparing models.

### Software Engineer Consultant | Integral.io (Ford Motor Company) | September 2021 - April 2022

- Migrated CI off Jenkins onto a combined Drone CI + Harness pipeline as part of an enterprise AWS to GCP cloud migration.
- Designed and shipped a WebSocket notification channel on GCP, satisfying the security team's auth and audit requirements as a precondition for the platform's GCP cutover.
- Authored the migration runbooks that downstream Ford engineering teams used to flip their own services from AWS to GCP, capturing the Jenkins to Drone / Harness rules and the GCP-equivalent service configurations.

### Java Developer | JPMorgan Chase | January 2020 - September 2021

- Converted a legacy COBOL mainframe application (Abandoned Assets Escheatment) into a Java 11 + Spring Boot microservice suite of 9+ services and authored the technical documentation governing the cross-team migration.
- Reduced reconciliation time by 50% by building Unix + Bash tooling that automatically diffed compliance reports.
- Decreased defect rate by 15% by adopting TDD with JUnit / Mockito across the new microservices.
- Implemented Excel spreadsheet and JSON loaders packaged as a standalone Apache Maven JAR, feeding business-rule data into the escheatment pipeline.

### Developer / Production Support | Huntington National Bank | December 2018 - September 2019

- Production support for the ACH and wire-transfer Payment Center: rewrote SQL scripts that decreased Oracle navigation time by 35%, and authored XSL-transform-based bash scripts that emailed daily security-issue reports.
- Re-engineered ASG-Zena job scheduling for the Payment Center and Escrow Solutions vendor apps, increasing informational output and file-operation stability.
- Built remote testing and development environments using SSMS and bash scripts; debugged Spring Boot / Java exceptions through the full production stack.

## Skills & Abilities

**Languages**

- Proficient: Python, Java 17/21 + Spring Boot, Bash, Scala / sbt
- Familiar: Go, SQL, TypeScript, C#

**Cloud & Platform**

- AWS: EKS, ECS / Fargate, Lambda, EC2, S3, IAM, ECR, Aurora / RDS, KMS, Bedrock, Spot Fleet, IRSA, MSK, VPC, SSM / Parameter Store
- Kubernetes ecosystem: Helm, ArgoCD, OpenTofu / Terraform, Renovate

**Security & Identity**

- Keycloak (SSO / OIDC), Cloudflare Tunnel, External Secrets Operator, DefectDojo, Trivy, Renovate, AWS Security Hub / GuardDuty, AWS IAM / IRSA, Kubernetes RBAC

**Data, Messaging, Observability**

- Apache Spark / PySpark, Apache Airflow, Apache Kafka, PostgreSQL, Redshift, Protobuf
- OpenTelemetry, Grafana Mimir / Tempo / Loki, Prometheus

**AI tools used:** OpenAI, Claude, Stable Diffusion

## Personal Projects

C# / Unity video-game mods on Thunderstore. Combined downloads across active mods exceed **960,000**.

**GrimoraMod** (150,000+ downloads, [github.com/julian-perge/GrimoraMod](https://github.com/julian-perge/GrimoraMod))

Game: Inscryption

- Solo revived and rebuilt a major _Inscryption_ total-conversion mod from the ground up (January - April 2022, 2,348 personal commits across ~4 months of full-time solo development), then grew it into a small Discord-coordinated team that continues the project today.
- Authored 61 pull requests covering custom cinematic events driven by imported Blender models, animated card behaviors, and bespoke card-ability implementations on top of runtime-patching stack.

**InscryptionAPI** (450,000+ downloads, [github.com/InscryptionModding/InscryptionAPI](https://github.com/InscryptionModding/InscryptionAPI))

Game: Inscryption

- Core mod-loader framework for the entire _Inscryption_ modding ecosystem; contributed 21 pull requests (16 merged) and ~85 commits as part of the maintainer team between November 2021 and March 2022.
- Work focused on refactoring patches layout, adding utility functions, and shipping sprite / portrait extension methods consumed by every downstream mod.

**OpenMonitors** (250,000+ downloads, [github.com/julian-perge/LC_OpenMonitors](https://github.com/julian-perge/LC_OpenMonitors))

Game: Lethal Company

- Extended in-game Unity ship-monitor objects to surface live teammate cameras, planet weather conditions, and per-crewmate alive/dead state - repurposing the game's existing monitor infrastructure rather than overlaying a new UI layer.

## Education

**We Can Code IT** (in-person software bootcamp) | Columbus, OH | May 2018 - August 2018

- Certificate: Software Development. Full-stack application development, OOP, logic design.

**Central Ohio Technical College** | Newark, OH | January 2016 - 2018
