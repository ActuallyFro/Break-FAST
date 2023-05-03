# Targeting Questions [HEN] (v1.0.0)

The following folder contains artifacts related to the Targeting Questions [HEN] (v1.0.0) project. 

## Additional Research into Software Engineering Techniques, Tactics, Procedures

### Software Engineering Body of Knowledge (SWEBoK) [^0][^1]
From Chat GPT:

Here are some additional strategies and approaches to software development, along with detailed examples and sources:

1. **Divide and conquer**: This strategy involves breaking a complex problem into smaller subproblems and solving them individually. The solutions to the subproblems are then combined to form the solution to the original problem. 

    Example: QuickSort algorithm. The algorithm selects a 'pivot' element, then partitions the array into two smaller arrays – one with elements less than the pivot and one with elements greater than the pivot. The algorithm is then recursively applied to the two smaller arrays. [Source](https://www.geeksforgeeks.org/quick-sort/)

2. **Stepwise refinement**: This approach involves breaking a problem down into a series of smaller problems or steps, then incrementally refining each step until the desired solution is achieved. 

    Example: Building a web application. Start by defining the high-level components (UI, backend, database), then refine each component by detailing its subcomponents and their interactions. Continue refining until you have a complete, detailed design. [Source](https://www.slideshare.net/AdewaleOshineye/stepwise-refinement)

3. **Top-down vs. bottom-up strategies**: Top-down strategies begin with a high-level view of the problem and work downwards, refining the solution at each level. Bottom-up strategies, on the other hand, start by building smaller components and combining them to form the overall solution.

    Example: Building a compiler. In a top-down approach, you would start by defining the high-level architecture (lexer, parser, code generator), then work on implementing each component. In a bottom-up approach, you would first implement smaller components (e.g., specific parsing rules) and then integrate them to form the complete compiler. [Source](https://www.cs.cf.ac.uk/Dave/C/node1.html)

4. **Heuristics**: Heuristic strategies use simple, practical techniques to find approximate solutions to complex problems. These solutions may not be optimal, but they can be found quickly and are often sufficient for practical purposes.

    Example: The A* search algorithm is a heuristic pathfinding algorithm used in AI and game development. It estimates the cost of reaching the goal from the current state and uses this information to guide the search, reducing the time it takes to find a solution. [Source](https://www.redblobgames.com/pathfinding/a-star/introduction.html)

5. **Patterns and pattern languages**: Patterns are reusable solutions to common problems that occur in software design. A pattern language is a collection of patterns that, when used together, can help guide the design process.

    Example: The Gang of Four's Design Patterns book describes 23 design patterns, such as the Singleton, Observer, and Strategy patterns, which can be applied to various software design problems. [Source](https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612)

6. **Iterative and incremental approach**: This approach involves developing software in small increments, with each increment adding new functionality or improving existing features. The process is iterative, with feedback from users and stakeholders guiding the development of future increments.

    Example: Agile methodologies, such as Scrum and Extreme Programming (XP), advocate for an iterative and incremental approach to software development. These methodologies emphasize short development cycles, continuous integration, and regular feedback from stakeholders. [Source](https://www.mountaingoatsoftware.com/agile/agile-development)

These examples represent just a few of the many strategies and approaches available for software development. By understanding and applying these techniques, you can improve the quality and maintainability of your software projects.

### Stepwise Refinement (Wirth, 1971)[^2]
Gries points out [^3]: 

> We use the term here mainly to describe the development of a method from its specification. We will see small steps, like breaking a high-level statement into a sequence of statements, introducing a local variable, translating an English statement into Java, and introducing a method.

And [^4]:

> "The Raven" is a famous poem by Edgar Allan Poe. Poe also wrote an essay titled "The "Philosophy of Composition", in which he describes how he developed "The Raven". It is pure top-down design / stepwise refinement! 


#### GPT-4 And Poe:

> In the shadows of software, where confusion reigns and chaos roams,
> Lies a path to clarity, to tame the madness in our code.
>
> S - Seek the vision of your goal, grasp the essence of your quest,
> T - Theorize and strategize, plan to give your very best.
> E - Explore the realm of tasks, a hierarchy to devise,
> P - Partition them with wisdom, let order slowly rise.
>
> W - Weave a tapestry of work, thread by thread, entwined,
> I - Iterate through every part, solutions you shall find.
> S - Subdivide the challenges, refine each step with care,
> E - Enlighten every function, let logic fill the air.
>
> R - Reevaluate your progress, take a step back and see,
> E - Engage in introspection, seek what must truly be.
> F - Fortify the structure, strengthen every seam,
> I - Integrate the pieces, a cohesive system to redeem.
>
> N - Nurture constant growth, evolve as you advance,
> E - Embrace the art of subtlety, let refinement guide your stance.
> M - Master the arcane technique, the secret of stepwise lore,
> E - Evermore, the method thrives, through the prose of Edgar Allan Poe.
> N - Navigate the murky depths, where uncertainty abides,
> T - Triumph over complexity, as stepwise refinement guides.
>
> In the grip of haunting darkness, where chaos once held sway,
> Stepwise refinement's wisdom leads the lost to light of day.
>
> Tamed is the madness in our code, brought forth by Poe's resplendent prose,
> The secret of stepwise refinement, now unveiled, forever shows.


## Work Item Grouping

The PlantUML and SVG files for the work item grouping can be found here:
- [01_01_HEN-Work-Item_Grouping.puml](01_01_HEN-Work-Item_Grouping.puml)
- [01_02_HEN-Work-Item_Grouping.svg](01_02_HEN-Work-Item_Grouping.svg)

## General Work Unit Tasks

The PlantUML and SVG files for the general work unit tasks can be found here:
- [02_01_General-WorkUnit-Tasks.puml](02_01_General-WorkUnit-Tasks.puml)
- [02_02_General-WorkUnit-Tasks.svg](02_02_General-WorkUnit-Tasks.svg)

## Specific Development Tasks

The PlantUML and SVG files for the specific development tasks can be found here:
- [03_01_Specific-Development-Tasks.puml](03_01_Specific-Development-Tasks.puml)
- [03_02_Specific-Development-Tasks.svg](03_02_Specific-Development-Tasks.svg)

## Work Breakdown Structure

The PlantUML and SVG files for the work breakdown structure can be found here:
- [04_01_WBS.puml](04_01_WBS.puml)
- [04_02_WBS.svg](04_02_WBS.svg)

## Eisenhower Matrix Start

The PlantUML and SVG files for the Eisenhower Matrix Start can be found here:
- [05_01_Eisenhower-Start.puml](05_01_Eisenhower-Start.puml)
- [05_02_Eisenhower-Matrix_Start.svg](05_02_Eisenhower-Matrix_Start.svg)


<!-- ## References -->

Here is a link to the [SWEBoK v4 Beta][^1].

[^0]: IEEE Computer Society. (December 2012).https://waseda.app.box.com/s/elnhhnezdycn2q2zp4fe0f2t1fvse5rn "SWEBoK V4 Beta (v2022Dec31).pdf". IEEE Computer Society Press.

[^1]: Bourque, P., Fairley, R. E., & IEEE Computer Society. (2014). _Guide to the Software Engineering Body of Knowledge (SWEBOK(R)): Version 3.0_ (3rd ed.). IEEE Computer Society Press.


[^2]: Wirth, N. (1971). Program development by stepwise refinement. _Communications of the ACM_, 14(4), 221-227. Retrieved on April 30, 2023, from https://dl.acm.org/doi/pdf/10.1145/362575.362577

[^3] Gries, David. (2007) Stepwise refinement. _JavaHyperText and Data Structures_. Cornell University. https://www.cs.cornell.edu/courses/JavaAndDS/stepwise/stepwise.html

[^4]: "The Philosophy of Composition." _Poetry Foundation_, 2019, 
www.poetryfoundation.org/articles/69390/the-philosophy-of-composition.

