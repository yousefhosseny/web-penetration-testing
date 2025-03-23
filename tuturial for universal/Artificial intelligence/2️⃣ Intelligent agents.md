# **1️⃣ What Makes an Agent "Intelligent"?**

For an agent to be considered "intelligent," it must do three things:

- **Perceive** its environment (using sensors).
- **Decide** the best action to take (using logic or learning).
- **Act** on the environment (using actuators).

A **dumb agent** follows fixed rules without thinking.  
An **intelligent agent** chooses actions based on its current situation.

## **Example: A Self-Driving Car** 🚗

- **Perceives** the road, traffic lights, and other cars using cameras & sensors.
- **Decides** when to stop, speed up, or turn using AI.
- **Acts** by pressing the brakes, turning the wheel, or accelerating.

## **الشرح بالعربي**

العامل الذكي هو أي كيان يستطيع:

1. **يراقب** البيئة من حوله باستخدام المستشعرات.
2. **يحلل** المعلومات ويحدد أفضل إجراء يقوم به.
3. **يتصرف** وفقًا لما قرره.

العامل الغبي يتبع قواعد ثابتة ولا يفكر، أما العامل الذكي فيقرر بناءً على الموقف الحالي.

## **مثال: السيارة ذاتية القيادة 🚗**

- **تشوف الطريق** والإشارات والسيارات الأخرى باستخدام الكاميرات والمستشعرات.
- **تحلل المعلومات** وتحدد متى تتوقف أو تسرع أو تنعطف باستخدام الذكاء الاصطناعي.
- **تنفذ القرارات** عن طريق الفرامل أو عجلة القيادة أو دواسة الوقود.

## **💡 الزتونة**

العامل الذكي **يشوف، يفكر، ويتصرف** بناءً على المعلومات اللي عنده، مش مجرد ينفذ أوامر ثابتة.

---

# **2️⃣ Agent Function vs. Agent Program**

💡 Think of an agent like a vending machine:

- **Agent function** is the brain (decides what to do).
- **Agent program** is the software (runs the decisions).

## **Example: A Vacuum Cleaner Robot 🧹**

- **Agent function**:
    
    - If the floor is dirty → **clean it**
    - If the floor is clean → **move to the next spot**
- **Agent program** (written as code):
    
    ```cpp
    function VACUUM-AGENT([location, status]) returns an action
       if status = Dirty then return Suck
       else if location = A then return Right
       else if location = B then return Left
    ```
    
- **Agent architecture**: The physical parts (wheels, motor, sensors).
    

## **الشرح بالعربي**

العامل الذكي يتكون من:

- **وظيفة العامل (Agent Function)**: "العقل" اللي بياخد القرار.
- **برنامج العامل (Agent Program)**: الكود اللي بينفذ القرار.

## **مثال: روبوت المكنسة الذكية 🧹**

- لو الأرض **متسخة** → **ينظفها**
- لو الأرض **نظيفة** → **يروح للمكان اللي بعده**

## **💡 الزتونة**

وظيفة العامل **هي المخ اللي بياخد القرار**، وبرنامج العامل **هو اللي بينفذ القرارات دي بالكود**.

---

# **3️⃣ Rational vs. Omniscient Agents**

An **omniscient agent** knows everything and always makes perfect decisions.  
❌ **Not possible in real life**.

A **rational agent** makes the best decision with the information it has.  
✅ **This is what we try to build in AI.**

## **Example: A Chess Player**

- **Omniscient Player**: Knows every possible move and never loses.
- **Rational Player**: Tries to play the best move based on what it knows.

## **الشرح بالعربي**

📌 العامل "العالم بكل شيء" (Omniscient Agent) يعرف كل حاجة ويقرر القرار المثالي دايمًا.  
❌ لكن ده **مستحيل في الحقيقة**.

📌 العامل "العقلاني" (Rational Agent) بياخد **أفضل قرار ممكن** بالمعلومات اللي عنده.  
✅ وده اللي بنحاول نصممه في الذكاء الاصطناعي.

## **مثال: لاعب شطرنج ♟️**

- **لاعب مثالي**: يعرف كل الحركات اللي ممكن تحصل وعمره ما يخسر.
- **لاعب عقلاني**: بيحاول يلعب أفضل حركة بالمعلومات اللي عنده.

## **💡 الزتونة**

المثالي **مستحيل**، لكن العقلاني **يحاول يختار أحسن حاجة متاحة**.

---

# **4️⃣ PEAS Model: Understanding Agents' Environments**

Before designing an agent, we must **understand where it will work**.  
We use the **PEAS model** to describe this.

## **PEAS = Performance, Environment, Actuators, Sensors**

## **Example: A Self-Driving Car**

- **Performance measure** – Safe driving, fuel efficiency, comfort.
- **Environment** – Roads, traffic, pedestrians.
- **Actuators** – Steering, braking, acceleration.
- **Sensors** – Cameras, GPS, radar, speedometer.

## **الشرح بالعربي**

📌 عشان نصمم عامل ذكي، لازم نفهم **البيئة اللي هيشتغل فيها**، ونستخدم **نموذج PEAS** عشان نوصفها.

PEAS =

- **P** (الأداء): إزاي نحكم عليه؟ (زي الأمان، توفير الوقود، الراحة).
- **E** (البيئة): المكان اللي شغال فيه (زي الطرق، إشارات المرور، المشاة).
- **A** (المؤثرات): الحاجات اللي بيستخدمها للتحرك (زي العجلات، الفرامل، دواسة البنزين).
- **S** (المستشعرات): الحاجات اللي بيستخدمها لجمع المعلومات (زي الكاميرات، GPS، الرادار).

## **مثال: سيارة ذاتية القيادة 🚗**

- **الأداء**: لازم تقود بأمان وتوفر بنزين وتكون مريحة.
- **البيئة**: الطرق، الزحمة، المشاة.
- **المؤثرات**: العجلات، الفرامل، دواسة الوقود.
- **المستشعرات**: الكاميرات، الـ GPS، والرادار.

## **💡 الزتونة**

قبل ما تصمم عامل ذكي، لازم تحدد **إزاي هيشتغل وإيه الأدوات اللي عنده** باستخدام **PEAS**.

---

# **5️⃣ Types of Environments (Where Agents Work)**

Not all environments are the same. Some are **easy** for an agent, and some are **hard**.

| Type                     | Meaning                      | Example                                  |
| ------------------------ | ---------------------------- | ---------------------------------------- |
| **Single-agent**         | Only one agent acts          | Solving a puzzle                         |
| **Multi-agent**          | Many agents interact         | Chess, stock market                      |
| **Fully observable**     | Agent sees everything        | Chess board                              |
| **Partially observable** | Agent sees only part         | Driving a car (can't see around corners) |
| **Deterministic**        | Everything is predictable    | A calculator                             |
| **Stochastic**           | Random events happen         | Traffic conditions                       |
| **Static**               | Environment doesn't change   | A Sudoku puzzle                          |
| **Dynamic**              | Environment changes          | Playing soccer                           |
| **Episodic**             | Every situation is separate  | Image classification                     |
| **Sequential**           | Past decisions affect future | Chess, driving                           |

## **الشرح بالعربي**

مش كل البيئات زي بعض، بعضها **سهل** وبعضها **صعب**، حسب نوع البيانات المتاحة والتفاعل.

### **أنواع البيئات:**

- بيئة **بسيطة** زي حل الألغاز.
- بيئة **معقدة** زي سوق الأسهم أو مباريات الكرة.
- بيئة **واضحة بالكامل** زي الشطرنج، وبيئة **جزئية** زي القيادة.
- بيئة **محددة** زي الآلة الحاسبة، وبيئة **عشوائية** زي المرور.

## **💡 الزتونة**

**كل ما زادت تعقيدات البيئة، كل ما احتجنا لعامل ذكي أكتر عشان يشتغل فيها كويس.** 🚀