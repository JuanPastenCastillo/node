/*
use employee_s;
SELECT e.emp_no, CONCAT(e.first_name, e.last_name) as full_name, CONCAT('$', FORMAT(s.amount, 0)) as total_salary
FROM employee e
JOIN salary s ON s.emp_no = e.emp_no
GROUP BY
e.emp_no;
*/

USE employee_s;

SELECT full_name, DENSE_RANK() OVER (
        ORDER BY salary DESC
    ) as rank_here, FORMAT(salary, 0)
from salary_by_employee;