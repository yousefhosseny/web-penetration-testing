
# **1. Simple Reflex Agent**

A **simple reflex agent** makes decisions based **only** on the current situation, without remembering past events.

## **Example:**

- **Vacuum Cleaner:** It cleans when it detects dirt but doesn’t remember where it has cleaned before.
- **Automatic Doors:** Open when they detect motion, without remembering past movements.

## **How it Works:**

- **Sensors** → Detect current situation (e.g., dirt present).
- **Condition-Action Rules** → If dirt is present, clean.
- **Actuators (Effectors)** → Perform the action (e.g., move or clean).

## **Limitations:**

- Doesn’t remember past states.
- Works well only in **fully observable** environments.

## **الشرح بالعربي:**

الوكيل ذو الاستجابة البسيطة هو نظام يتخذ القرارات بناءً فقط على الوضع الحالي، دون أي ذاكرة للأحداث السابقة.

### **مثال:**

- **المكنسة الكهربائية البسيطة:** تنظف عندما تكتشف الأوساخ، لكنها لا تتذكر الأماكن التي قامت بتنظيفها سابقًا.
- **الأبواب الأوتوماتيكية:** تفتح عند اكتشاف الحركة دون حفظ بيانات الحركات السابقة.

### **كيف يعمل؟**

- **المستشعرات (Sensors):** تكتشف الحالة الحالية مثل وجود أوساخ.
- **قواعد الاستجابة (Condition-Action Rules):** إذا كان هناك أوساخ → قم بالتنظيف.
- **المشغلات (Actuators):** تنفذ الفعل، مثل التحرك أو التنظيف.

## **الزتونة:**

- يعتمد فقط على الحالة الحالية دون ذاكرة.
- مناسب للبيئات البسيطة والمفتوحة بالكامل.

---

# **2. Model-Based Reflex Agent**

A **model-based reflex agent** can **remember past events** and use that memory to make better decisions.

## **Example:**

- **Smart Vacuum Cleaner:** Remembers where it has already cleaned and avoids unnecessary movements.
- **Self-Driving Car:** Uses past frames from a camera to detect traffic lights and other cars.

## **How it Works:**

- **Internal State (Memory)** → Stores past information.
- **Condition-Action Rules** → Uses both current and past information to decide.

## **Why It’s Better?**

- Works well in **dynamic or partially observable** environments.
- More intelligent decisions compared to a simple reflex agent.

## **الشرح بالعربي:**

الوكيل ذو الاستجابة المعتمدة على النموذج لديه ذاكرة تمكنه من تذكر الأحداث السابقة واتخاذ قرارات أفضل بناءً على هذه المعلومات.

## **مثال:**

- **مكنسة كهربائية ذكية:** تتذكر الأماكن التي قامت بتنظيفها بالفعل لتجنب التحرك العشوائي.
- **سيارة ذاتية القيادة:** تستخدم صورًا سابقة للكاميرا للتعرف على إشارات المرور والمركبات الأخرى.

## **كيف يعمل؟**

- **الذاكرة الداخلية:** تخزن المعلومات السابقة.
- **قواعد الاستجابة:** تستخدم المعلومات الحالية والسابقة لاتخاذ القرار.

## **الزتونة:**

- لديه ذاكرة تجعله أكثر ذكاءً من الوكيل ذو الاستجابة البسيطة.
- مناسب للبيئات الديناميكية أو غير القابلة للمراقبة الكاملة.

---

# **3. Goal-Based Agent**

A **goal-based agent** doesn’t just react but makes decisions based on **a goal** it wants to achieve.

## **Example:**

- **GPS Navigation:** It plans a route to a destination instead of just reacting to traffic signals.
- **Self-Driving Taxi:** Knows it must reach the airport and chooses roads accordingly.

## **How it Works:**

- **Has a goal** → Tries to reach a specific destination.
- **Plans actions** → Decides best steps to achieve the goal.

## **Drawback:**

- May not always choose the best path (e.g., may find a route but not the fastest one).

## **الشرح بالعربي:**

الوكيل القائم على الهدف لا يتفاعل فقط مع البيئة، بل يحدد هدفًا يسعى لتحقيقه.

## **مثال:**

- **نظام الملاحة GPS:** يخطط مسارًا للوصول إلى وجهة محددة بدلاً من الاستجابة لإشارات المرور فقط.
- **تاكسي ذاتي القيادة:** يعرف أنه يجب أن يصل إلى المطار ويختار الطرق بناءً على ذلك.

## **كيف يعمل؟**

- **لديه هدف:** يسعى للوصول إلى وجهة معينة.
- **يخطط للخطوات:** يقرر أفضل الخطوات للوصول إلى الهدف.

## **الزتونة:**

- يعتمد على الأهداف وليس فقط على رد الفعل.
- قد لا يختار دائمًا المسار الأفضل ولكنه يحقق الهدف المطلوب.

---

# **4. Utility-Based Agent**

A **utility-based agent** chooses actions that **maximize its benefit (best quality decision)** instead of just reaching a goal.

## **Example:**

- **Taxi Driver:** Chooses the fastest, safest, and cheapest route instead of just any route.
- **AI in Games:** Chooses the best move that maximizes the chance of winning.

## **How it Works:**

- **Has a utility function** → Assigns value to each possible action.
- **Chooses the best option** → Picks the action with the highest value.

## **Why It’s Better?**

- More **intelligent** than goal-based agents.
- Can optimize decisions for speed, cost, or other factors.

## **الشرح بالعربي:**

الوكيل القائم على الفائدة لا يسعى فقط إلى تحقيق هدف، بل يختار الإجراء الذي يوفر **أكبر فائدة ممكنة**.

## **مثال:**

- **سائق التاكسي:** يختار أسرع وأرخص وأأمن طريق بدلاً من أي طريق عشوائي.
- **الذكاء الاصطناعي في الألعاب:** يختار الحركة التي تزيد فرص الفوز.

## **كيف يعمل؟**

- **لديه دالة فائدة:** تحدد قيمة لكل إجراء محتمل.
- **يختار الأفضل:** ينفذ الفعل الذي يعطي أعلى فائدة.

## **الزتونة:**

- أكثر ذكاءً من الوكيل القائم على الهدف.
- يمكنه تحسين القرارات بناءً على عوامل مثل السرعة والتكلفة.