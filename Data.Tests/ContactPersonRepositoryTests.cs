

using Data.Entities;
using Data.Interfaces;
using Data.Repositories;

namespace Data.Tests;

public class ContactPersonRepositoryTests : RepositoryTestsOptions
{    
    private readonly IContactPersonRepository _contactRepository;
    private readonly ICustomerRepository _customerRepository;

    public ContactPersonRepositoryTests()
    {       
        _contactRepository = new ContactPersonRepository(_context);
        _customerRepository = new CustomerRepository(_context);
    }

    [Fact]
    public async Task CreateAsyncShouldAddContactPersonToDatabase()
    {
        //  Arrange
        var testCustomerEntity = new CustomerEntity()
        {
            CompanyName = "testCompany",
            Email = "info@testCompany.com"
        };

        var testEntity = new ContactPersonEntity()
        {
            FirstName = "TestCreate",
            LastName = "TestCreate",
            Email = "testcreate@test.com",
            PhoneNumber = "987654321",
            CustomerId = 1
        };

        //  Act

        await _customerRepository.CreateAsync(testCustomerEntity);
        int affectedCustomerRows = await _customerRepository.SaveChangesAsync();

        await _contactRepository.CreateAsync(testEntity);
        int affectedContactRows = await _contactRepository.SaveChangesAsync();

        var contactPersonResult = await _contactRepository.GetAsync(x => x.Email == testEntity.Email);
        var customerResult = await _customerRepository.GetAsync(x => x.Email == testCustomerEntity.Email);


        //  Assert
        Assert.NotNull(contactPersonResult);
        Assert.Equal(contactPersonResult.PhoneNumber, testEntity.PhoneNumber);
        Assert.Equal(contactPersonResult.CustomerId, customerResult.Id);

        //  Cleanup
    }

    [Fact]
    public async Task GetAllShouldReturnListOfContactPersons()
    {
        //  Arrange
        var testEntity = new ContactPersonEntity()
        {
            FirstName = "TestGetAll",
            LastName = "TestGetAll",
            Email = "testgetall@test.com",
            PhoneNumber = "987654321",
            CustomerId = 1
        };

        await _contactRepository.CreateAsync(testEntity);
        await _contactRepository.SaveChangesAsync();

        //  Act
        var result = await _contactRepository.GetAllAsync();
        

        //  Assert
        Assert.NotNull(result);
        Assert.IsType<List<ContactPersonEntity>>(result);
        foreach (var x in result)
        {
            Assert.IsType<ContactPersonEntity>(x);
        }
    }

    [Fact]
    public async Task GetAsyncShouldReturnContactPersonEntity()
    {
        //  Arrange
        var testEntity = new ContactPersonEntity()
        {
            FirstName = "TestGet",
            LastName = "TestGet",
            Email = "testget@test.com",
            PhoneNumber = "987654321",
            CustomerId = 1
        };

        await _contactRepository.CreateAsync(testEntity);
        await _contactRepository.SaveChangesAsync();


        //  Act
        var result = await _contactRepository.GetAsync(x => x.Email == testEntity.Email);

        //  Assert
        Assert.NotNull(result);
        Assert.Equal(testEntity.Email, result.Email);
        Assert.IsType<ContactPersonEntity>(result);
    }

    [Fact]
    public async Task UpdateShouldUpdateTheContactPersonInDatabase()
    {
        //  Arrange
        var testEntity = new ContactPersonEntity()
        {
            FirstName = "TestUpdate",
            LastName = "TestUpdate",
            Email = "ChangeMe@test.com",
            PhoneNumber = "987654321",
            CustomerId = 1
        };
        string emailToUpdateTo = "iamupdated@testupdate.com";

        await _contactRepository.CreateAsync(testEntity);
        int affectedRows  = await _contactRepository.SaveChangesAsync();

        var contactToUpdate = await _contactRepository.GetAsync(x => x.Email == testEntity.Email);

        //  Act
        contactToUpdate.Email = emailToUpdateTo;
        _contactRepository.Update(contactToUpdate);
        var updatedContact = await _contactRepository.GetAsync(x => x.Id == contactToUpdate.Id);

        //  Assert
        Assert.Equal(updatedContact.Email, emailToUpdateTo);
    }

    [Fact]
    public async Task DeleteShouldRemoveContactPersonFromDatabase()
    {
        //  Arrange
        var testEntity = new ContactPersonEntity()
        {
            FirstName = "TestDelete",
            LastName = "TestDelete",
            Email = "testDelete@test.com",
            PhoneNumber = "987654321",
            CustomerId = 1
        };

        await _contactRepository.CreateAsync(testEntity);
        int affectedRowsCreating = await _contactRepository.SaveChangesAsync();

        //  Act
        var contactToDelete = await _contactRepository.GetAsync(x => x.Email == testEntity.Email);
        _contactRepository.Delete(contactToDelete);
        int affectedRowsDeleting = await _contactRepository.SaveChangesAsync();

        //  Assert
        Assert.True(affectedRowsDeleting > 0);
        Assert.Null(await _contactRepository.GetAsync(x => x.Id == contactToDelete.Id));
    }

}
