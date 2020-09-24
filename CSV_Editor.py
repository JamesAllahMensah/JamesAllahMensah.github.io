import csv

def converter(file_name):
    with open('C:\\Users\\Ethan.Waldner\\GitProjects\\Project-ProBot\\IntelliHubBot\\'+file_name+'.csv', encoding='utf8', newline='') as origcsv:
        reader = csv.reader(origcsv)
        with open('C:\\Users\\Ethan.Waldner\\GitProjects\\Project-ProBot\\IntelliHubBot\\'+file_name+'.txt', 'w+',encoding='utf8', newline='') as csvfile:
            writer = csv.writer(csvfile, delimiter='\t')
            for row in reader:
                writer.writerow(row)
