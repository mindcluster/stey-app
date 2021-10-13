import pandas as pd
import mysql.connector
import names
import datetime
import random
import requests


def get_employees_from_excel():
    df = pd.read_excel(r'C:\Users\jjean\Documents\Projects\stey-app\docs\populate_db\sheets\Template_Funcionarios_avaliacoes.xlsx',
                       engine='openpyxl', header=0)

    df_cleaned = pd.DataFrame(df, columns=['GPN', 'Nome', 'Salario Base FY Atual', 'Employee Status', 'Pais', 'Gender', 'Location City', 'Service Line', 'SMU Name', 'SUB SL',
                                           'Rank Atual', 'Exp Lev Atual', 'Job Title', 'Hiring Date', 'Proporcional Hiring Date', 'Utilização', 'Promoção', 'LEAD Atual', 'Rank Futuro', 'Exp Level Futuro', 'Level'])
    return df_cleaned


def insert_employees(mydb, df_cleaned):
    mycursor = mydb.cursor()
    number_inserted = 0

    for index, row in df_cleaned.iterrows():
        EMAIL = row['GPN'] + '@ey.com.br'
        PASSWORD = '$2a$08$QmivfICA/QZdeqxlC0Dv6eM.W2oOkXZCpAreFyW6H4TyU3a8.6742'
        GPN = row['GPN']
        NOME = names.get_full_name()
        SALARIO_BASE_FY_ATUAL = row['Salario Base FY Atual']
        EMPLOYEE_STATUS = row['Employee Status']
        PAIS = row['Pais']
        GENDER = row['Gender']
        LOCATION_CITY = row['Location City']
        SERVICE_LINE = row['Service Line']

        SUB_SL = row['SUB SL']
        RANK_ATUAL = row['Rank Atual']
        EXP_LEV_ATUAL = row['Exp Lev Atual']
        JOB_TITLE = row['Job Title']
        HIRING_DATE = str(row['Hiring Date'])
        PROPORCIONAL_HIRING_DATE = row['Proporcional Hiring Date']
        UTILIZAÇAO = row['Utilização']
        PROMOÇAO = row['Promoção']
        LEAD_ATUAL = row['LEAD Atual']
        RANK_FUTURO = row['Rank Futuro']
        EXP_LEVEL_FUTURO = row['Exp Level Futuro']
        ACTUAL = 0.13123
        LEVEL = row['Level']
        LAST_PROMOTION_DATE = get_random_date()
        LAST_PROMOTION_DATE = f"'{LAST_PROMOTION_DATE}'" if datetime.date(
            2021, 2, 1) <= LAST_PROMOTION_DATE else "NULL"

        SMU_NAME = row['SMU Name']
        SMUS_ID = get_smu(mydb, SMU_NAME)
        JOBS_ID = get_jobs(mydb, JOB_TITLE)
        IMAGE = get_image_profile()

        ENTRY_DATE = f"'{get_random_date()}'"
        EXIT_DATE = get_random_date()
        EXIT_DATE = f"'{EXIT_DATE}'" if datetime.date(
            2021, 1, 1) <= EXIT_DATE else "NULL"

        sql = f'''INSERT INTO EMPLOYEES(EMAIL, PASSWORD, GPN, NOME, SALARIO_BASE_FY_ATUAL, EMPLOYEE_STATUS, PAIS, GENDER, LOCATION_CITY, SERVICE_LINE, SUB_SL, RANK_ATUAL, EXP_LEV_ATUAL, JOB_TITLE, HIRING_DATE, PROPORCIONAL_HIRING_DATE, LAST_PROMOTION_DATE, UTILIZAÇAO, PROMOÇAO, LEAD_ATUAL, RANK_FUTURO, EXP_LEVEL_FUTURO, ACTUAL, SMUS_ID, JOBS_ID, LEVEL, ENTRY_DATE, EXIT_DATE, IMAGE)
        VALUES("{EMAIL}", "{PASSWORD}", "{GPN}", "{NOME}", "{SALARIO_BASE_FY_ATUAL}", "{EMPLOYEE_STATUS}",
               "{PAIS}", "{GENDER}", "{LOCATION_CITY}", "{SERVICE_LINE}", "{SUB_SL}", "{RANK_ATUAL}", {EXP_LEV_ATUAL},
               "{JOB_TITLE}", "{HIRING_DATE}", "{PROPORCIONAL_HIRING_DATE}", {LAST_PROMOTION_DATE}, "{UTILIZAÇAO}", "{PROMOÇAO}", "{LEAD_ATUAL}", 
               "{RANK_FUTURO}", {EXP_LEVEL_FUTURO}, {ACTUAL}, {SMUS_ID}, {JOBS_ID}, {LEVEL}, {ENTRY_DATE}, {EXIT_DATE}, "{IMAGE}");'''
        print(sql)
        mycursor.execute(sql)
        number_inserted += 1
        mydb.commit()

    print(number_inserted, "record inserted.")
    mycursor.close()


def get_smu(mydb, smu_name):
    mycursor = mydb.cursor()

    mycursor.execute(f"SELECT * FROM SMUS WHERE SMU_NAME = '{smu_name}'")

    myresult = mycursor.fetchall()
    mycursor.close()
    if(len(myresult) > 0):
        return myresult[0][0]
    return 1


def get_jobs(mydb, job_name):
    mycursor = mydb.cursor()

    mycursor.execute(f"SELECT * FROM JOBS WHERE NAME = '{job_name}'")

    myresult = mycursor.fetchall()
    mycursor.close()
    if(len(myresult) > 0):
        return myresult[0][0]
    return 1


def insert_certificates(mydb):
    mycursor = mydb.cursor()

    for i in range(1, 150):
        sql = f'''INSERT INTO CERTIFICATES(NAME, DATE, EMPLOYEES_ID)
        VALUES("Certificado {random.randint(1, 1000)}", '{get_random_date()}', {random.randint(1, 100)});'''

        mycursor.execute(sql)
        mydb.commit()
    mycursor.close()


def get_random_date():
    start_date = datetime.date(2020, 1, 1)
    end_date = datetime.date(2021, 5, 1)

    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_number_of_days = random.randrange(days_between_dates)
    random_date = start_date + datetime.timedelta(days=random_number_of_days)
    return random_date


def get_image_profile():
    return requests.get('https://randomuser.me/api/').json()['results'][0]['picture']['large']


def main():
    try:
        mydb = mysql.connector.connect(
            host="localhost",
            port=3306,
            user="user_stey",
            password="123456",
            database="stey_db"
        )

        df_cleaned = get_employees_from_excel()
        insert_employees(mydb, df_cleaned)
        insert_certificates(mydb)
    except mysql.connector.Error as err:
        print(err)


if __name__ == '__main__':
    main()
