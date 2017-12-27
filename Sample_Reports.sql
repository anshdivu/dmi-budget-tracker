----------------------------------------------------------------------------------------
-- SQL Statements for Different Reports
----------------------------------------------------------------------------------------

--
-- Project Budget Status - Current budget information for all projects (or one if you pick a project_id)
--
SELECT 
  project_id,
  project_name, 
  P.START_DATE,
  P.END_DATE,
  P.BASE_BUDGET,
  ROUND(SUM(ACTUAL_HOURS)::numeric, 2) as TOTAL_ACTUAL_HOURS, 
  ROUND(SUM(ACTUAL_REVENUE)::numeric, 2) AS "TOTAL_ACTUAL_REVENUE (EAC)",
  ROUND(SUM(case when type = 'Billed' then ACTUAL_REVENUE else 0 end)::numeric, 2) AS "Actual Spend to Date",
  ROUND((SUM(ACTUAL_REVENUE) - P.BASE_BUDGET)::numeric, 2) AS ACTUAL_REVENUE_DIFFERENCE,
  ROUND((SUM(ACTUAL_REVENUE) / P.BASE_BUDGET*100)::numeric, 2) AS ACTUAL_PCT_DIFFERENCE,
  ROUND(SUM(FORECAST_HOURS)::numeric, 2) as TOTAL_FORECAST_HOURS, 
  ROUND(SUM(FORECAST_REVENUE)::numeric, 2) as TOTAL_FORECAST_REVENUE,
  ROUND(SUM(case when type = 'Billed' then FORECAST_REVENUE else 0 end)::numeric, 2) AS "Baseline Spend to Date",
  ROUND((SUM(FORECAST_REVENUE) - P.BASE_BUDGET)::numeric, 2) AS BASELINE_DIFFERENCE,
  ROUND((SUM(FORECAST_REVENUE) / P.BASE_BUDGET*100)::numeric, 2) AS BASELINE_PCT_DIFFERENCE
FROM BIG_QUERY BQ
JOIN PROJECT P ON (BQ.PROJECT_ID = P.ID)
GROUP BY project_id, project_name, P,START_DATE, P.END_DATE, P.BASE_BUDGET
ORDER BY PROJECT_NAME;

----------------------------------------------------------------------------------------
--
-- Project Actuals - Merged view of actual and baseline hours by client/project/person/day
--
select * from big_query where project_id = 12;

----------------------------------------------------------------------------------------
--
-- Budget Trend Chart - Monthly accumulated revenue for a project
--
SELECT 
  month, 
  sum(actual) OVER (ORDER BY month) AS actual, 
  sum(forecast) OVER (ORDER BY month) AS forecast 
from
   (SELECT 
      month, 
      sum(actual_revenue) as actual, 
      sum (forecast_revenue) as forecast 
    from 
      big_query 
    where 
      project_id = 12 
    group by month 
    order by month) t ;

----------------------------------------------------------------------------------------
--
-- Project Resource Plan (Before crosstab)
--
SELECT Week, PERSON_NAME, SUM(ACTUAL_HOURS)
from BIG_QUERY BQ
WHERE PROJECT_ID = 11
GROUP BY WEEK, PERSON_NAME
ORDER BY WEEK, PERSON_NAME;

-- Project Resource Plan (After Crosstab - should do this in code with the data from previous query)

SELECT * FROM crosstab(
  'SELECT Week, PERSON_NAME, SUM(ACTUAL_HOURS)
   from BIG_QUERY BQ
   WHERE PROJECT_ID = 11
   GROUP BY WEEK, PERSON_NAME
   ORDER BY WEEK, PERSON_NAME',
  'SELECT DISTINCT PERSON_NAME FROM BIG_QUERY WHERE PROJECT_ID = 11 order by person_name')
AS (
  Week text,
  "Boshu Liu" numeric,
  "Jim Garlick" numeric,
  "Musema Hassen" numeric
);

----------------------------------------------------------------------------------------
--
-- Monthly Revenue - Actual/Projected revenue for a project
--
select 
  month, 
  sum(actual_revenue) as "Actual", 
  sum(forecast_revenue) as "Baseline"
from big_query
where project_id = 12
group by month
order by month;

----------------------------------------------------------------------------------------
--
-- Project Resource Spend - Resource spend to date vs baseline
--
select 
  person_name, 
  round(sum(actual_hours)::numeric, 1) as "Actual",
  round(sum(forecast_hours)::numeric, 1) as "Baseline"
from big_query
where project_id = 5 and type = 'Billed'
group by person_name
order by person_name;

----------------------------------------------------------------------------------------
--
-- Person/Role Billed vs Unbilled - Billed hours to date vs remaining hours
--
select 
  person_name, 
  role,
  round(sum(case when type = 'Billed' then actual_hours else 0 end)::numeric, 1) as "Billed",
  round(sum(case when type = 'Unbilled' then actual_hours else 0 end)::numeric, 1) as "Unbilled"
from big_query
where project_id = 12
group by person_name, role
order by person_name, role;

----------------------------------------------------------------------------------------
--
-- Global Resource Tracking - Weekly total hours by resource
--
select 
  week,
  person_name, 
  sum(actual_hours)
from big_query
group by week, person_name
order by week, person_name;


----------------------------------------------------------------------------------------
--
-- Upcoming PTO - Shows PTO for projects (only future PTO)
--
SELECT DISTINCT
  p.name AS project_name,
  p.id AS project_id,
  person.name AS person_name,
  person.id AS person_id,
  pto.descr,
  pto.start_date,
  pto.end_date
 FROM person
   JOIN person_pto pto ON person.id = pto.person_id
   JOIN project_person pp ON person.id = pp.person_id
   JOIN project p ON p.id = pp.project_id
WHERE pto.start_date > now()
ORDER BY p.id, pto.start_date;
