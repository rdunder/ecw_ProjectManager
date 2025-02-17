

using Data.Contexts;
using Data.Entities;
using Data.Interfaces;
using Data.Repositories;
using Microsoft.EntityFrameworkCore;

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
            FirstName = "test",
            LastName = "test",
            Email = "test@test.com",
            PhoneNumber = "987654321",
            CustomerId = 1
        };

        //  Act
        _contactRepository.BeginTransactionAsync();

        await _customerRepository.CreateAsync(testCustomerEntity);
        await _contactRepository.CreateAsync(testEntity);

        _contactRepository.SaveChangesAsync();
        _contactRepository.CommitTransactionAsync();

        var contactPersonResult = await _contactRepository.GetAsync(x => x.Email == testEntity.Email);
        var customerResult = await _customerRepository.GetAsync(x => x.Email == testCustomerEntity.Email);

        //  Assert
        Assert.NotNull(contactPersonResult);
        Assert.Equal(contactPersonResult.PhoneNumber, testEntity.PhoneNumber);
        Assert.Equal(contactPersonResult.CustomerId, customerResult.Id);
    }
}
