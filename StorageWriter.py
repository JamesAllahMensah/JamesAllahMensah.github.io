import os, calendar, datetime, _datetime

companies = ['Accenture', 'Booz Allen Hamilton', 'CACI International', 'CGI Federal', 'Deloitte',
             'Jacobs Technology', 'Leidos', 'Lockheed Martin', 'ManTech', 'Peraton', 'Perspecta',
             'SAIC-Engility']


def check_if_last_day_of_week(date):
    import datetime
    import calendar

    last_day_of_month = calendar.monthrange(date.year, date.month)[1]
    if date == datetime.date(date.year, date.month, last_day_of_month):
        return True
    return False


def importdata(company):
    dir_path = os.path.dirname(os.path.realpath(__file__))

    filepathblog = dir_path + '\\IntelliHubBot' + '\\' + company + '_Blog.txt'
    fileblogs = open(filepathblog, 'r', encoding="utf8")
    blogdata = fileblogs.readlines()
    blogdata.pop(0)

    filepathnews = 'IntelliHubBot/' + company + '_News.txt'
    filenews = open(filepathnews, 'r', encoding="utf8")
    newsdata = filenews.readlines()
    newsdata.pop(0)

    filepathsocial = 'IntelliHubBot/' + company + '_Social.txt'
    filesocial = open(filepathsocial, 'r', encoding="utf8")
    socialdata = filesocial.readlines()
    socialdata.pop(0)

    companydata = [blogdata, newsdata, socialdata]

    return companydata


def writetostorage(company):
    today = _datetime.date.today()
    month = calendar.month_name[today.month]
    data = importdata(company)
    blog_data = data[0]
    news_data = data[1]
    social_data = data[2]

    storagefile = open('IntelliHubBot/' + company + '_Storage.txt', 'w+', encoding="utf8")
    storagefile.write(month+"\n")
    storagefile.write('BLOG\n')

    for i in blog_data:
        storagefile.write(i)

    storagefile.write('NEWS\n')

    for i in news_data:
        storagefile.write(i)

    storagefile.write('SOCIAL\n')

    for i in social_data:
        storagefile.write(i)

    storagefile.write(month + " FINISHED")
    return True


def main():
    today = _datetime.date.today()
    if not check_if_last_day_of_week(today):
        return
    else:
        print('Storage Files Overwriting...')
        for i in companies:
            writetostorage(i)


if __name__ == '__main__':
    main()