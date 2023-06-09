Break FAST
==========

![AI Logo FTW](BreakFAST_01.png)
_<center><small>(Credit Stable Diffusion)</small></center>_

Background
----------
> Break FAST is a software development process that involves breaking down a project into smaller, manageable parts, identifying the requirements for each part, analyzing the potential return on investment for each part, and isolating the task units necessary to develop each part.
> 
> The process begins with breaking down the overall project into smaller, more manageable parts. Then, requirements for each part are identified, taking into consideration the specific needs of the end-users. Once the requirements are identified, an analysis is performed to determine the potential return on investment for each part. This helps in prioritizing the development of parts that will provide the greatest value to the end-users.
> 
> Next, task units are isolated for each part. This involves identifying the specific software components that need to be developed for each part. The isolated task units are then developed rapidly using the DevOps methodology, which involves continuous integration, testing, and deployment.
> 
> The rapid prototyping enables the software development team to quickly iterate through different designs and implementations, incorporating feedback from end-users along the way. The end result is a high-quality software product that meets the needs of the end-users, developed in a shorter amount of time than traditional software development methods.
> 
> -**As described by CHATGPT**

### Phases
1. Focused Analysis - "SOW"
   - Steps
     - Software Problem Area Taxonomy (SPAT) [Paper Link](https://github.com/ActuallyFro/Work-Papers/blob/main/05_AFSOC/01_SPAT/Software-Problems-2022_1-0-0.pdf)
     - Operational Analysis
     - Work(er/load/unit) Analysis.
   - Outcome: identification of user execution capabilities/needs.
   - Tools:
     - 1. [Focused Analysis Questionnaire](./Tools/Questionnaires/SOW/)
2. Scoping - "COW"
   - Steps
     - Capability
     - Opportunity
     - Worth
   - Outcome: list of general requirements and their value.
   - Tools:
     - 1. [Scoping Questionnaire](./Tools/Questionnaires/COW/)
3. Targeting - "HEN"
   - Steps
     - Hew - Tool: [Mermaid Renderer Single-Page Application](./Tools/Single-page-Apps/Mermaid-Renderer/)
     - Evaluate - Tool: [Eisenhower Matrix Single-Page Application](./Tools/Single-page-Apps/Eisenhower-Matrix/)
     - Nab - Tool: [Pomodoro Timer Single-Page Application](./Tools/Single-page-Apps/Pomodoro-Timer/)
   - Outcome: decomposition of needs and requirements into development units of work, which then leverage modern AI (e.g., Large Language Model/natural language AI like ChatGPT) tools.
   - Other Tools:
     - 1. [Targeting Questionnaire](./Tools/Questionnaires/HEN/)
     - 2. [Kanban Board Single-Page Application](./Tools/Single-page-Apps/Kanban-Board/)

Definitions
-----------
The word "production" means the usage of a software development technique (e.g., Agile, Scrum, DevOps, DevSecOps, etc.) to produce software.

The phrase "left of development" shall be treated as the activities that are used for pre-production before a given production technique is applied.
Pre-production and "left of development" may be interchangeably used.

Examples
--------
1. Using Break-FAST to create an 'SPA' (if I were to EVER merge the code too...) to enable [GraphML](http://graphml.graphdrawing.org/primer/graphml-primer.html) development.
   1. [Source Folder](https://github.com/ActuallyFro/Break-FAST/tree/main/Examples/01_GraphML-Editor)
   2. [Example running](./Examples/01_GraphML-Editor/Single-page-Apps/)

Credits
-------
Image based on some materials from Stable Diffusion, per the CreativeML Open RAIL++-M License Section III Paragraph 6 -- no claims nor endorsement by Stable Diffusion (i.e., Stability AI and contributors) is implied. Image is released under a [Creative Commons Zero (CC0) 1.0 Universal License](https://creativecommons.org/publicdomain/zero/1.0/)


