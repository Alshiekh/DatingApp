using AutoMapper;
using DatingApp.Api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using DatingApp.Api.Helpers;
using CloudinaryDotNet;
using System.Threading.Tasks;
using DatingApp.Api.Dtos;
using System.Security.Claims;
using System.Linq;
using DatingApp.Api.Models;
using CloudinaryDotNet.Actions;

namespace DatingApp.Api.Controllers
{
    
   [Route("api/users/{userId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
         private readonly IDatingRepository _repo;
        private readonly IMapper _mapper ;

        private readonly IOptions<CloudinarySettings> _cloudianryconfig;
        private readonly Cloudinary _cloudianry;

        public PhotosController(IDatingRepository repo , IMapper mapper , IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _repo = repo;
            _mapper= mapper;
            _cloudianryconfig = cloudinaryConfig;

            Account Acc = new Account(
              _cloudianryconfig.Value.CloudName ,
              _cloudianryconfig.Value.ApiKey,
              _cloudianryconfig.Value.ApiSecret
            );

            _cloudianry = new Cloudinary(Acc);

        }
        [HttpGet("{id}",Name="GetPhoto")] 
        public async Task<IActionResult> GetPhoto(int id) {
            var photoFromRepo = await _repo.GetPhoto(id);

            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);
            return Ok(photo);
        }


       [HttpPost]
       public async Task<IActionResult> AddPhotoForUser (int UserId ,
         [FromForm]PhotoForCreationDto photoforCreationDto) 
         {
            if( UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)){
              return Unauthorized();
             }

            var userFromRepo = await _repo.GetUser(UserId);

            var file = photoforCreationDto.File;

            var uploadResult = new ImageUploadResult();

            if( file.Length > 0) {
                using(var stream = file.OpenReadStream())
                 {
                    var uploadParms = new ImageUploadParams()
                     {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500)
                        .Height(500).Crop("fill")
                        .Gravity("face")
                     };
                  uploadResult = _cloudianry.Upload(uploadParms);
                }
            }
               
               photoforCreationDto.Url = uploadResult.Uri.ToString();
               photoforCreationDto.PublicId = uploadResult.PublicId;

               var photo =  _mapper.Map<Photo>(photoforCreationDto);
               photo.UserId = UserId;
               
                if (!userFromRepo.Photos.Any(x=>x.IsMain)) 
                photo.IsMain = true;

                userFromRepo.Photos.Add(photo);

                if (await _repo.SaveAll()) 
                {
                    var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
                   return CreatedAtRoute("GetPhoto", new {id = photo.Id}, photoToReturn);
                }

                return BadRequest("Could Not Add Photo");
        }


        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto (int UserId , int id ) {

            //   var t = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            //  if( UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //    return Unauthorized();
  
             var user = await _repo.GetUser(UserId);
             if(!user.Photos.Any(p => p.Id==id )) {
                  return Unauthorized();
                  }

                  var photoFromRepo = await _repo.GetPhoto(id);
                  if(photoFromRepo.IsMain) {
                      return BadRequest("this already the Main Photo");
                  }

                  var currentMainPhoto = await _repo.GetMainPhotoForUser(UserId);
                  currentMainPhoto.IsMain = false;

                  photoFromRepo.IsMain = true ;

                  if(await _repo.SaveAll()){
                      return NoContent();
                  }

                  return BadRequest(" Could not set Photo Is Main ");
        }


         [HttpDelete("{id}")]
         public async Task<IActionResult> DeletePhoto(int userId ,int id) {
                
            //    var t = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            //   if( userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //   return Unauthorized();
               
            var user = await _repo.GetUser(userId);

            if(!user.Photos.Any(p => p.Id==id))
            return Unauthorized();

            var photoFromRepo = await _repo.GetPhoto(id);

            if (photoFromRepo.IsMain)
            return BadRequest("you cannot delete your main photo");

            if(photoFromRepo.PublicId!= null) {
            var deleteParms = new DeletionParams(photoFromRepo.PublicId);
             var result = _cloudianry.Destroy(deleteParms);

             if(result.Result == "ok") {
                 _repo.Delete(photoFromRepo);
               }
            } 
              if (photoFromRepo.PublicId==null) {
                   _repo.Delete(photoFromRepo);
              }
           

             if(await _repo.SaveAll())
             return Ok();

            return BadRequest("Failed to delete the Photo");


           
         }
    }
}
