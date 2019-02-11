using AutoMapper;
using DatingApp.Api.Dtos;
using DatingApp.Api.Models;
using System.Linq;

namespace DatingApp.Api.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {

            CreateMap<User, UserForListDto>()
            .ForMember(dest => dest.PhotoUrl,opt => 
            {
                opt.MapFrom( src => src.Photos.FirstOrDefault(p => p.IsMain).Url); 
            })
             .ForMember(dest => dest.Age, opt => 
            {
                opt.ResolveUsing( d => d.BirthDate.CalculateAge()); 
            });
            CreateMap<User, UserForDetailedDto>()
             .ForMember(dest => dest.PhotoUrl,opt => 
            {
                opt.MapFrom( src => src.Photos.FirstOrDefault(p => p.IsMain).Url); 
            }) .ForMember(dest => dest.Age,opt => 
            {
                opt.ResolveUsing( d => d.BirthDate.CalculateAge()); 
            });
            CreateMap<Photo, PhotoForDetailedDto>();
        }

    }
}