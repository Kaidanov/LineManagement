using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace Line.Wcf
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.
    public class Service1 : IService1
    {
        LineDBEntities1 db = new LineDBEntities1();


        public List<Customer> GetCustomers()
        {
            try
            {
                //return only those who hasn't been handled yet
                //order by id asc
                List<Customer> list = db.Customers.Where(x => x.Status != 2).OrderBy(x => x.LineTime).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw new FaultException<string>
                     (ex.Message);
            }
            
        }

        public bool AddCustomer(string Name)
        {
            try
            {
                Customer itm = db.Customers.Create();
                itm.Name = Name;
                itm.Status = 0;
                itm.LineTime = DateTime.Now;
                db.Customers.Add(itm);
                db.Entry(itm).State = EntityState.Added;
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new FaultException<string>
                     (ex.Message);
            }
            return true;
        }


        public bool UpdateCustomer(List<Customer> customers)
        {
            try
            {
                foreach(Customer customer in customers)
                {
                    Customer itm = db.Customers.Where(x => x.Id == customer.Id).FirstOrDefault();
                    Console.WriteLine(itm);
                    if (itm != null)
                    {
                        itm.Status = customer.Status;
                        db.Entry(itm).State = EntityState.Modified;
                        db.SaveChanges();
                    }
                }
               
               
            }
            catch (Exception ex)
            {
                throw new FaultException<string>
                     (ex.Message);
            }
            return true;
        }
    }
}
