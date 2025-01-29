using Service.Interfaces;
using Service.Models;

namespace Service.Helpers;

public class Result : IResult
{
    public bool Success { get; protected set; }
    public int StatusCode { get; protected set; }
    public string? ErrorMessage { get; protected set; }


    public static Result Ok() =>
        new Result()
        {
            Success = true,
            StatusCode = 200,
        };

    public static Result BadRequest(string message) => 
        new Result()
        {
            Success = false,
            StatusCode = 400,
            ErrorMessage = message,
        };
    
    public static Result NotFound(string message) =>
        new Result()
        {
            Success = false,
            StatusCode = 404,
            ErrorMessage = message,
        };
    
    public static Result AlreadyExists(string message) =>
        new Result()
        {
            Success = false,
            StatusCode = 409,
            ErrorMessage = message,
        };
    
    public static Result ExceptionError(string message) =>
        new Result()
        {
            Success = false,
            StatusCode = 500,
            ErrorMessage = message,
        };
}


public class Result<T> : Result, IResult<T>
{
    public T Data { get; protected set; }

    public static Result<T> Ok(T data) =>
        new Result<T>
        {
            Success = true,
            StatusCode = 200,
            Data = data,
        };

    public new static Result<T> ExceptionError(string message) =>
        new Result<T>()
        {
            Success = false,
            StatusCode = 500,
            ErrorMessage = message,
        };
}