---
title: "PHYSICS 201"
---
<!-- # review

-   The SOH-CAH-TOA trig identities only work for right triangles
-   For finding sides and angles of general (non right) triangles:
    -   **Law of sines**: $\frac{\sin{A}}{a}=\frac{\sin{B}}{b}=\frac{\sin{C}}{c}$ where the sine of an angle is divided by the length of its opposite side — should only be used if you know the angle will be acute or obtuse since it only returns values [0,90]
    -   **Law of cosines**: $a^2 = b^2+c^2-(2bc)*\cos{A}$
-   The quotient rule for derivatives: $\frac{d}{dx}(\frac{f(x)}{g(x)})=\frac{g(x)f'(x) - f(x)g'(x)}{(g(x))^2}$, or “low d hi _mine_ hi d low, _o_ low low”
-   **Scalars** are values with a single number, like speed, height, temperature, while **vectors** have a magnitude and a direction, like acceleration, weight
-   Vector operations:
    -   Addition: $\vec{A}+\vec{B}=\vec{B}+\vec{A}=\vec{R}$
    -   Scalar multiplication: $s(\vec{A}+\vec{B})=s(\vec{A})+s(\vec{B})$
-   A **unit vector** always has magnitude 1
    -   $\vec{v}=|\vec{v}|\hat{v}$ where $|\vec{v}|$ is the magnitude of $v$ and $\hat{v}$ is the unit vector
    -   $x$ direction unit vector is $\hat{i}$; $y$ direction is $\hat{j}$; $z$ direction is $\hat{k}$
        -   $\vec{V}=a\hat{i}+b\hat{j}+c\hat{k}$
-   Unit vector formula: $\hat{u}_v=\frac{\vec{v}}{|\vec{v}|}$
    -   Magnitude formula: $|\vec{v}|=\sqrt{|\vec{v}^x|^2+|\vec{v}_y|^2+|\vec{v}_z|^2}$
-   **Dot product**: $\vec{A}\cdot\vec{B}=|\vec{A}||\vec{B}|\cos(\theta)$; produces scalar product of two vectors
    -   Commutative property holds; associate property only holds for scalar mult.; distributive property holds onto for vector addition
-   **Cross product**: $\vec{A}\times\vec{B}=|\vec{A}||\vec{B}|\sin(\theta)\hat{n}$; produces vector product of two vectors
    -   Not commutative; associative only for scalar mult.; distributive only for vector addition
    -   Can be evaluated by taking the determinant of a 3x3 matrix
-   The **right hand rule** is used to determine the direction of the norm vector $\hat{n}$ of a cross product

![right hand rule](/images/physics201/right-hand-rule.png)

-   A **position vector** describes the location of a particle relative to a reference point at time $t$
-   A **displacement vector** is the change in the position of a particle between two distinct time periods
-   **Average velocity** is the change in displacement divided by the change in time $\vec{v}_{avg}=\frac{\Delta\vec{r}}{\Delta t}$ while the **velocity vector** is the velocity of a particle at a moment in time $\vec{v}(t)=\frac{d\vec{r}(t)}{dt}$
    -   The speed (scalar) of the particle is the magnitude of the velocity at that moment
-   The **acceleration vector** is the second derivative of the position vector $\vec{a}(t)=\frac{d\vec{v}(t)}{dt}$
-   Constant acceleration can be assumed for most many scenarios (like projectile motion) and the following three equations can be used:
    -   $v=v_0+a_c(t-t_0)$
    -   $s = s_0+v_0(t-t_0)+\frac{1}{2}a_c(t-t_0)^2$
    -   $v^2=v_0^2+2a_c(s-s_0)$
-   **Projectile motion** is the motion of a particle moving through the air, while **free fall** is straight line motion with zero initial velocity
-   Horizontal and vertical motion are independent of each other
-   Equations relating components of a vector:
    -   $v^2 = v_x^2+v_y^2$
    -   $v_{0x}=v_x\cos\theta$; $v_{y0}=v_0\sin\theta$
-   **Newton’s Laws of Motion**
    -   **First**: A body remains at rest or remains in motion in the absence of applied forces — if there is zero net force, then object remains in constant velocity
    -   **Second**: $\vec{F}=m\vec{a}$
    -   **Third**: The forces of action and reaction between particles are equal in magnitude, opposite in direction, and collinear
-   **Normal force** is the force which prevents an object from moving through a surface (like a floor)
-   **Friction** is the portion of contact force between two surfaces, tangent to the contact surface — it is always opposing relative motion between contacting objects
    -   $F=$ friction force; $\mu_s=$ static coefficient of friction; $N=$ normal force; $\mu_k =$ kinetic coefficient of friction
    -   No slip: $|F|<\mu_s|N|$ — the objects are not moving or sliding against each other; friction cannot be calculated based on $\mu$ and $N$, but could be calculated from $\vec{F}=m\vec{a}$
    -   Impending slip: $|F|=\mu_s|N|$ — one object is just about to slide against the other
    -   Slip: $|F|=\mu_k|N|$ — they are sliding

--- -->

# lectures
## course intro & measurement
- The final figure is the "estimated" figure -- keep all sure digits and one estimated digit
- Don't count leading zeroes when counting sig figs, but include tailing zeroes
- Keep all digits until calculations are finished and round after
	- Addition/subtraction: the last significant figure after the decimal point can't be more accurate than any of the operands, meaning the # of sig figs (after decimal) is the same as the lowest out of the operands
	- Multiplication/division: lowest # of sigfigs among all operands, note that it's NUMBER of sigfigs which is different than after the decimal point

# reading
## ch1: physics and measurement
- **SI** system of measurement:
	- **Length (meters)** as the distance between two points
	- **Mass (kilograms)** as an object's amount of material...
	- **Time (seconds)**
- **Density ($\rho$):** $\rho\equiv\frac{m}{V}$; mass per unit volume
- Sometimes we want to express really small numbers, which we can do so using scientific notation and *order of magnitude*, where the ~ symbol denotes "is on the order of", ex: 720m ~ (is about) 10^3m

## ch2: motion in one dimension
-   **Position ($x$):** location of the particle with respect to an origin point
-   **Displacement ($\Delta x)$:** $\Delta x\equiv x_f-x_i$; change in _position_ over a time interval
    -   **Average velocity (m/s):** $v_{x,avg}\equiv\frac{\Delta x}{\Delta t}$; _displacement_ per time interval
    -   **Instantaneous velocity (m/s): $v_x\equiv\frac{dx}{dt}$**; _velocity_ at a moment in time
-   **Distance:** length of a path travelled by a particle — different than _displacement_
    -   Displacement can be zero even if distance is not zero, ex: moving down a hallway and then returning to the starting position has a displacement of 0, but a distance of the length of the hallway travelled * 2
    -   **Average speed (m/s):** $v_{avg}\equiv\frac{d}{\Delta t}$; _distance_ per time interval
    -   **Instantaneous speed (m/s):** magnitude of _instantaneous velocity_
-   **Vector:** direction and magnitude; **Scalar:** numerical value and no direction
-   A particle can have a constant velocity, which implies that it has a constant speed; however, constant speed does not imply constant velocity (magnitude can stay the same, but direction doesn’t always)
-   Problem solving approach: conceptualize, categorize/simplify, analyze, finalize
- **Average acceleration ($a_{x,avg}=\frac{\Delta v_x}{\Delta t}$):** measured in $\frac{m}{s^2}$ and describes the change in velocity over time
	- **Instantaneous acceleration ($a_x=\frac{dv_x}{dt}=\frac{d^2x}{dt^2}$):**
	- Kinematics equations assumed to be true under constant acceleration:
		- $v_{xf}=v_{xi}+a_xt$
		- $x_f=x_i+\frac{1}{2}(v_{xi}+v_{xf})t$
		- $x_f=x_i+v_{xi}t+\frac{1}{2}a_xt^2$
		- $v_{xf}^2=v_{xi}^2+2a_x(x_f-x_i)$
- If acceleration and velocity have the same sign, that means the particle is speeding up; if they have different signs, the particle is slowing down
- A freely falling object is any object moving solely under the influence of gravity
	- Acceleration due to gravity, or **free-fall acceleration**, is denoted with $g$, and is about $9.8 \frac{m}{s^2}$

## ch3: vectors
- Cartesian coordinates, also called rectangular coordinates, are expressed as $(x, y)$
- Polar coordinates are measured in distance from the origin, and angle from the positive right axis -- $(r, \theta)$
- **Scalars** consist of a single value with a unit but without a direction; **vectors** have number, unit (magnitude), and direction
	- Vectors are comprised of *components*, which are the $x$ and $y$ vectors that make up the vector -- $A_x=A\cos\theta$, $A_y=A\sin\theta$
- A **unit vector** is a dimensionless vector that has a magnitude of 1 -- it only specifies 1 unit of distance in a direction
	- Common unit vectors include $\hat{i}$, $\hat{j}$, $\hat{k}$ for one unit in the $x$, $y$, and $z$ directions respectively
	- Vectors can be added by adding their components together
- Vectors can be added by using the head-to-tail method of placing the tail of a new vector at the tip of the last vector
- ![[Pasted image 20220911112820.png]]
	- Addition is commutative and associative
	- Subtraction is adding a negative vector -- invert both the direction and magnitude of a vector to get its negative version
- Scalar multiplication for vectors consists of multiplying the magnitude by a scalar value

## ch4: motion in two dimensions
- **Position vector ($\vec{r}$):** $\vec{r}=x\vec{i}+y\vec{j}$;  location of the particle with respect to the origin of a coordinate system
- **Displacement vector ($\Delta \vec{r}$):** $\Delta \vec{r}\equiv\vec{r}_f-\vec{r}_i$; a vector that describes the change in position vectors
	- **Average velocity:** $\vec{v}_{avg}\equiv\frac{\Delta\vec{r}}{\Delta t}$; displacement vector per time interval, or how much the displacement changes for every $t$ -- results in a vector along $\Delta\vec{r}$
	- **Instantaneous velocity:** $\vec{v}\equiv\frac{d\vec{r}}{dt}$; velocity vector at a moment in time, tangent to the particle's path
		- Speed ($|\vec{v}|$) of the particle is the magnitude of the *instantaneous velocity*
- **Average acceleration ($\vec{a}_{avg}\equiv\frac{\Delta\vec{v}}{\Delta t}$)** and **instantaneous acceleration ($\vec{a}\equiv\frac{d\vec{v}}{dt}$)** describe the change in velocity per $t$ and as $t$ approaches 0 respectively
	- Under constant accerlation, we can assume the following equations: (Search "four kinematics equations")
		- $\vec{v}_f=\vec{v}_i+\vec{a}t$
		- $\vec{r}_f=\vec{r}_i+\vec{v}_it+\frac{1}{2}\vec{a}t^2$
		- $\vec{r}_f=\vec{r}_i+\frac{1}{2}(\vec{v}_i+\vec{v}_f)t$
		- $\vec{v}_f^2=\vec{v}_i^2-2\vec{a}\Delta\vec{r}$
		![constant acceleration equations](/images/physics201/constant-acceleration-eqns.png)
 - Movement in the $x$ direction does not affect movement in the $y$ direction -- motion in 2d can be modelled as two independent motions
 - **Projectile motion** is parabolic motion through the air where we assume free-fall acceleration is constant and air resistance is negligible
 - One specific case of projectile motion is when it returns to the same horizontal level as when it starts
![projectile motion](/images/physics201/projectile-motion.png)
	 - $h$ is the maximum height ($h=\frac{v_i^2\sin^2\theta_i}{2g}$), while $R$ is the horizontal range of the particle ($R=\frac{v_i^2\sin2\theta_i}{g}$)
		 - $R$ is at its maximum when $\theta$ is 45 degrees
		 ![different ranges at various angles](/images/physics201/angle-example.png)
- Uniform circular motion describes when a particle is moving in a circular motion at a constant speed
	- The direction of the velocity vector is always changing in circular motion, so an acceleration is present and points towards the center of the circle, perpendicular to the velocity vector
- Acceleration in circular movement is defined by $a_c=\frac{v^2}{r}$, $a_c=r\omega^2$, also called **centripetal acceleration**
	- The length of time it takes to complete one circle of rotation is called the **period** $T$ -- $T=\frac{2\pi r}{v}$
	- **Angular speed** $\omega$ is measured in radians/second and is the inverse of $T$ -- $\omega=\frac{2\pi}{T}$
	- $v=r\omega$: as radial position increases (away from the center), speed also increases