from cassandra.cluster import Cluster
import uuid
import requests
from datetime import date,timedelta,datetime
import time 
cluster = Cluster(['127.0.0.1'])  
session = cluster.connect('clima') 

def fechas_list(start:date,end:date,ndelta:int=1):
    fechas=[]
    delta=timedelta(days=ndelta)
    while start<=end:
        fechas.append(start)
        start+= delta
    return fechas
def processing_data(data):
    forecast=data['forecast']["forecastday"][0]
    date_=forecast['date']
    hours=forecast['hour']
    print(f"el dia {date_} tuvo las siguientes teperatouras")
    date_list=[]
    time_list=[]
    temperature_list=[]
    for h in hours:
        time_=h["time"]
        fecha=time_.split(" ")
        temperatura=h['temp_c']
        print(f"El dia {fecha[0]} con la hora {fecha[1]}")
        print(f"temperatura {temperatura}")
        date_list.append(fecha[0])
        time_list.append(fecha[1])
        temperature_list.append(temperatura)
    return date_list,time_list,temperature_list
def insert_database(municipio:str,date_:list,time_:list,temperature:list):

    for d,t,c in zip(date_,time_,temperature):
        fecha = datetime.strptime(d, "%Y-%m-%d").date()
        hora = datetime.strptime(t, "%H:%M").time()
        temperatura = float(c)
        session.execute(
        """
        INSERT INTO clima(id,municipio,fecha,hora,temperatura)
        VALUES(%s,%s,%s,%s,%s)
        """,
        (uuid.uuid4(),municipio,fecha,hora,temperatura)
        )
def api_caller(key,municipios_,fechas_):
    for municipio in municipios_:
        for fecha in fechas_:
            url = f"https://api.weatherapi.com/v1/history.json?key={key}&q={municipio},México&dt={fecha}"
            try:
                response = requests.get(url, timeout=(5, 10))
                if response.status_code == 200:
                    data = response.json()
                    date_list, time_list, temperature_list = processing_data(data)
                    insert_database(municipio, date_list, time_list, temperature_list)
                    print(f"Datos insertados para {municipio} en {fecha}")
                else:
                    print(f"Error HTTP {response.status_code} para {municipio} en {fecha}")
            except requests.exceptions.Timeout:
                print(f"Timeout para {municipio} en {fecha}, se omitirá.")
            except Exception as e:
                print(f"Error procesando {municipio} en {fecha}: {e}")
            time.sleep(2)
        print(f" {municipio} ya fue agregado completamente,revisa si no tuvo codigo de errores alguna insercion o que falten datos")
    print("se termino de insertar")
if "__main__"==__name__:
    fechas=fechas_list(date(2025,7,1),date.today())
    api_key="56e8fcb449ad42b0a5234450252210"
    municipios=["Abasolo","Acámbaro","Apaseo el Alto","Apaseo el Grande","Atarjea","Celaya","Comonfort","Coroneo","Cortazar","Cuerámaro","Doctor Mora","Dolores Hidalgo","Guanajuato","Huanímaro","Irapuato","Jaral del Progreso","Jerécuaro","León","Manuel Doblado","Moroleón","Ocampo","Pénjamo","Pueblo Nuevo","Purísima del Rincón","Romita","Salamanca","Salvatierra","San Diego de la Unión","San Felipe","San Francisco del Rincón","San José Iturbide","San Luis de la Paz","San Miguel de Allende","Santa Catarina","Santa Cruz de Juventino Rosas","Santiago Maravatío","Silao","Tarandacuao","Tarimoro","Tierra Blanca","Uriangato","Valle de Santiago","Victoria","Villagrán","Xichú","Yuriria"]
    api_caller(api_key,municipios,fechas)