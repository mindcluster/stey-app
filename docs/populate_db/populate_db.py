import pandas as pd
import mysql.connector
import names


def get_employees_from_excel():
    df = pd.read_excel(r'C:\Users\jjean\Documents\Projects\stey-app\docs\populate_db\sheets\Template_Funcionarios_avaliacoes.xlsx',
                       engine='openpyxl', header=0)

    df_cleaned = pd.DataFrame(df, columns=['GPN', 'Nome', 'Salario Base FY Atual', 'Employee Status', 'Pais', 'Gender', 'Location City', 'Service Line', 'SMU Name', 'SUB SL',
                                           'Rank Atual', 'Exp Lev Atual', 'Job Title', 'Hiring Date', 'Proporcional Hiring Date', 'Utilização', 'Promoção', 'LEAD Atual', 'Rank Futuro', 'Exp Level Futuro'])
    return df_cleaned


def insert_employees(mydb, df_cleaned):
    mycursor = mydb.cursor()

    for index, row in df_cleaned.iterrows():
        EMAIL = row['GPN'] + '@ey.com.br'
        PASSWORD = 'teste'
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

        SMU_NAME = row['SMU Name']
        SMUS_ID = get_smu(mydb, SMU_NAME)
        JOBS_ID = get_jobs(mydb, JOB_TITLE)

        sql = f'''INSERT INTO EMPLOYEES(EMAIL, PASSWORD, GPN, NOME, SALARIO_BASE_FY_ATUAL, EMPLOYEE_STATUS, PAIS, GENDER, LOCATION_CITY, SERVICE_LINE, SUB_SL, RANK_ATUAL, EXP_LEV_ATUAL, JOB_TITLE, HIRING_DATE, PROPORCIONAL_HIRING_DATE, UTILIZAÇAO, PROMOÇAO, LEAD_ATUAL, RANK_FUTURO, EXP_LEVEL_FUTURO, ACTUAL, SMUS_ID, JOBS_ID)
        VALUES("{EMAIL}", "{PASSWORD}", "{GPN}", "{NOME}", "{SALARIO_BASE_FY_ATUAL}", "{EMPLOYEE_STATUS}",
               "{PAIS}", "{GENDER}", "{LOCATION_CITY}", "{SERVICE_LINE}", "{SUB_SL}", "{RANK_ATUAL}", {EXP_LEV_ATUAL},
               "{JOB_TITLE}", "{HIRING_DATE}", "{PROPORCIONAL_HIRING_DATE}", "{UTILIZAÇAO}", "{PROMOÇAO}", "{LEAD_ATUAL}", 
               "{RANK_FUTURO}", {EXP_LEVEL_FUTURO}, {ACTUAL}, {SMUS_ID}, {JOBS_ID});'''
        mycursor.execute(sql)

        mydb.commit()

    print(mycursor.rowcount, "record inserted.")
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


def main():
    try:
        mydb = mysql.connector.connect(
            host="localhost",
            user="user_stey",
            password="123456",
            database="stey_db"
        )

        df_cleaned = get_employees_from_excel()
        insert_employees(mydb, df_cleaned)
    except mysql.connector.Error as err:
        print(err)


if __name__ == '__main__':
    main()
